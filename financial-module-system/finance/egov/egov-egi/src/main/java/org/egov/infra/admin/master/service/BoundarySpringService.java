package org.egov.infra.admin.master.service;

import com.vividsolutions.jts.geom.Coordinate;
import com.vividsolutions.jts.geom.Geometry;
import com.vividsolutions.jts.geom.Point;

import org.egov.infra.admin.master.contracts.BoundarySearchRequest;
import org.egov.infra.admin.master.entity.Boundary;
import org.egov.infra.admin.master.entity.BoundaryType;
import org.egov.infra.admin.master.entity.HierarchyType;
import org.egov.infra.admin.master.repository.BoundaryRepository;
import org.egov.infra.config.core.ApplicationThreadLocals;
import org.egov.infra.exception.ApplicationRuntimeException;
import org.egov.infra.utils.StringUtils;
import org.geotools.data.DataStore;
import org.geotools.data.DataStoreFinder;
import org.geotools.feature.FeatureCollection;
import org.geotools.geometry.jts.JTSFactoryFinder;
import org.opengis.feature.simple.SimpleFeature;
import org.opengis.feature.simple.SimpleFeatureType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.ValidationException;

import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional(readOnly = true)
public class BoundarySpringService {
    private static final Logger LOG = LoggerFactory.getLogger(BoundarySpringService.class);
    private static final String GIS_SHAPE_FILE_LOCATION = "gis/%s/wards.shp";

    private final BoundaryRepository boundaryRepository;

    @Autowired
    private CrossHierarchyService crossHierarchyService;

    @Autowired
    private BoundaryTypeService boundaryTypeService;

    @Autowired
    public BoundarySpringService(final BoundaryRepository boundaryRepository) {
        this.boundaryRepository = boundaryRepository;
    }

    @Transactional
    public Boundary createBoundary(final Boundary boundary) {
        boundary.setMaterializedPath(getMaterializedPath(null, boundary.getParent()));
        return boundaryRepository.save(boundary);
    }

    @Transactional
    public void updateBoundary(final Boundary boundary) {
        boundary.setMaterializedPath(getMaterializedPath(boundary, boundary.getParent()));
        boundaryRepository.save(boundary);
    }

    public Boundary getBoundaryById(final Long id) {
        return boundaryRepository.findOne(id); // TODO: Migrate to findById for Spring Data JPA 2.x+
    }

    public List<Boundary> getAllBoundariesOrderByBoundaryNumAsc(BoundaryType boundaryType) {
        return boundaryRepository.findByBoundaryTypeOrderByBoundaryNumAsc(boundaryType);
    }

    public List<Boundary> getAllBoundariesByBoundaryTypeId(final Long boundaryTypeId) {
        return boundaryRepository.findByBoundaryTypeId(boundaryTypeId);
    }

    public Page<Boundary> getPageOfBoundaries(BoundarySearchRequest searchRequest) {
        Pageable pageable = new PageRequest(searchRequest.pageNumber(), searchRequest.pageSize(),
                searchRequest.orderDir(), searchRequest.orderBy()); // TODO: Migrate to PageRequest.of for Spring Data JPA 2.x+
        return boundaryRepository.findByBoundaryTypeId(searchRequest.getBoundaryTypeId(), pageable);
    }

    public Boundary getBoundaryByTypeAndNo(final BoundaryType boundaryType, final Long boundaryNum) {
        return boundaryRepository.findByBoundaryTypeAndBoundaryNum(boundaryType, boundaryNum);
    }

    public List<Boundary> getParentBoundariesByBoundaryId(final Long boundaryId) {
        List<Boundary> boundaries = new ArrayList<>();
        final Boundary boundary = getBoundaryById(boundaryId);
        if (boundary != null) {
            boundaries.add(boundary);
            if (boundary.getParent() != null)
                boundaries = getParentBoundariesByBoundaryId(boundary.getParent().getId());
        }
        return boundaries;
    }

    public List<Boundary> getBoundaryWithItsAncestors(Long boundaryId) {
        List<Boundary> boundaries = new ArrayList<>();
        Boundary boundary = getBoundaryById(boundaryId);
        if (boundary != null) {
            boundaries.add(boundary);
            if (boundary.getParent() != null)
                boundaries.addAll(getBoundaryWithItsAncestors(boundary.getParent().getId()));
        }
        return boundaries;
    }

    public List<Boundary> getActiveBoundariesByBoundaryTypeId(final Long boundaryTypeId) {
        return boundaryRepository.findActiveBoundariesByBoundaryTypeId(boundaryTypeId);
    }

    public List<Boundary> getTopLevelBoundaryByHierarchyType(final HierarchyType hierarchyType) {
        return boundaryRepository.findActiveBoundariesByHierarchyTypeAndLevelAndAsOnDate(hierarchyType, 1l, new Date());
    }

    public List<Boundary> getActiveChildBoundariesByBoundaryId(final Long boundaryId) {
        return boundaryRepository.findActiveChildBoundariesByBoundaryIdAndAsOnDate(boundaryId, new Date());
    }

    public List<Boundary> getChildBoundariesByBoundaryId(final Long boundaryId) {
        return boundaryRepository.findChildBoundariesByBoundaryIdAndAsOnDate(boundaryId, new Date());
    }

    public Boundary getActiveBoundaryByBndryNumAndTypeAndHierarchyTypeCode(final Long bndryNum,
                                                                           final String boundaryType, final String hierarchyTypeCode) {
        return boundaryRepository.findActiveBoundaryByBndryNumAndTypeAndHierarchyTypeCodeAndAsOnDate(bndryNum,
                boundaryType, hierarchyTypeCode, new Date());
    }

    public List<Boundary> getActiveBoundariesByBndryTypeNameAndHierarchyTypeName(final String boundaryTypeName,
                                                                                 final String hierarchyTypeName) {
        return boundaryRepository.findActiveBoundariesByBndryTypeNameAndHierarchyTypeName(boundaryTypeName,
                hierarchyTypeName);
    }

    public List<Boundary> getBoundariesByBndryTypeNameAndHierarchyTypeName(final String boundaryTypeName,
                                                                           final String hierarchyTypeName) {
        return boundaryRepository.findBoundariesByBndryTypeNameAndHierarchyTypeName(boundaryTypeName,
                hierarchyTypeName);
    }

    public Boundary getBoundaryByBndryTypeNameAndHierarchyTypeName(final String boundaryTypeName,
                                                                   final String hierarchyTypeName) {
        return boundaryRepository.findBoundaryByBndryTypeNameAndHierarchyTypeName(boundaryTypeName, hierarchyTypeName);
    }

    public List<Boundary> getBondariesByNameAndTypeOrderByBoundaryNumAsc(final String boundaryName, final Long boundaryTypeId) {
        return boundaryRepository.findByNameAndBoundaryTypeOrderByBoundaryNumAsc(boundaryName, boundaryTypeId);
    }

    public Boolean validateBoundary(final BoundaryType boundaryType) {
        return Optional.ofNullable(boundaryRepository.findByBoundaryTypeNameAndHierarchyTypeNameAndLevel(
                boundaryType.getName(), boundaryType.getHierarchyType().getName(), 1L)).isPresent();
    }

    public List<Boundary> getBondariesByNameAndBndryTypeAndHierarchyType(final String boundaryTypeName,
                                                                         final String hierarchyTypeName, final String name) {
        return boundaryRepository.findActiveBoundariesByNameAndBndryTypeNameAndHierarchyTypeName(boundaryTypeName,
                hierarchyTypeName, name);
    }

    public List<Map<String, Object>> getBoundaryDataByNameLike(final String name) {
        final List<Map<String, Object>> list = new ArrayList<>();

        crossHierarchyService.getChildBoundaryNameAndBndryTypeAndHierarchyType("Locality", "Location", "Administration",
                '%' + name + '%').stream().forEach(location -> {
            final Map<String, Object> res = new HashMap<>();
            res.put("id", location.getId());
            res.put("name", location.getChild().getName() + " - " + location.getParent().getName());
            list.add(res);
        });
        return list;
    }

    public List<Boundary> findActiveChildrenWithParent(final Long parentBoundaryId) {
        return boundaryRepository.findActiveChildrenWithParent(parentBoundaryId);
    }

    public List<Boundary> findActiveBoundariesForMpath(final Set<String> mpath) {
        return boundaryRepository.findActiveBoundariesForMpath(mpath);
    }

    public String getMaterializedPath(final Boundary child, final Boundary parent) {
        String mpath = "";
        int childSize = 0;
        if (null == parent)
            mpath = String.valueOf(boundaryRepository.findAllParents().size() + 1);
        else
            childSize = boundaryRepository.findActiveImmediateChildrenWithOutParent(parent.getId()).size();
        if (mpath.isEmpty())
            if (null != child) {
                if (parent != null && !child.getMaterializedPath().equalsIgnoreCase(parent.getMaterializedPath() + "." + childSize)) {
                    childSize += 1;
                    mpath = parent.getMaterializedPath() + "." + childSize;
                } else
                    mpath = child.getMaterializedPath();
            } else if (parent != null) {
                childSize += 1;
                mpath = parent.getMaterializedPath() + "." + childSize;
            }

        return mpath;
    }

    public Boundary getBoundaryByGisCoordinates(final Double latitude, final Double longitude) {
        return getBoundary(latitude, longitude)
                .orElseThrow(() -> new ValidationException("gis.location.info.not.found"));
    }

    public Optional<Boundary> getBoundary(final Double latitude, final Double longitude) {
        try {
            if (latitude != null && longitude != null) {
                final Map<String, URL> map = new HashMap<>();
                map.put("url", Thread.currentThread().getContextClassLoader()
                        .getResource(String.format(GIS_SHAPE_FILE_LOCATION, ApplicationThreadLocals.getTenantID())));
                final DataStore dataStore = DataStoreFinder.getDataStore(map);
                final FeatureCollection<SimpleFeatureType, SimpleFeature> collection = dataStore
                        .getFeatureSource(dataStore.getTypeNames()[0]).getFeatures();
                final Iterator<SimpleFeature> iterator = collection.iterator();
                final Point point = JTSFactoryFinder.getGeometryFactory(null)
                        .createPoint(new Coordinate(longitude, latitude));
                try {
                    while (iterator.hasNext()) {
                        final SimpleFeature feature = iterator.next();
                        final Geometry geom = (Geometry) feature.getDefaultGeometry();
                        if (geom.contains(point)) {
                            return getBoundaryByNumberAndType((Long) feature.getAttribute("bndrynum"), (String) feature.getAttribute("bndrytype"));
                        }
                    }
                } finally {
                    collection.close(iterator);
                }
            }

            return Optional.empty();
        } catch (final IOException e) {
            LOG.error("Error occurred while fetching boundary from GIS data", e);
            return Optional.empty();
        }
    }

    public Optional<Boundary> getBoundaryByNumberAndType(Long boundaryNum, String boundaryTypeName) {
        if (boundaryNum != null && StringUtils.isNotBlank(boundaryTypeName)) {
            final BoundaryType boundaryType = boundaryTypeService
                    .getBoundaryTypeByNameAndHierarchyTypeName(boundaryTypeName, "ADMINISTRATION");
            final Boundary boundary = this.getBoundaryByTypeAndNo(boundaryType,
                    boundaryNum);
            if (boundary == null) {
                final BoundaryType cityBoundaryType = boundaryTypeService
                        .getBoundaryTypeByNameAndHierarchyTypeName("City", "ADMINISTRATION");
                return Optional.ofNullable(this.getAllBoundariesByBoundaryTypeId(cityBoundaryType.getId()).get(0));
            }
            return Optional.of(boundary);
        }

        return Optional.empty();
    }
} 