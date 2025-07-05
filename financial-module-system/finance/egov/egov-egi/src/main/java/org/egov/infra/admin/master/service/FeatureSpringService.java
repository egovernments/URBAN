package org.egov.infra.admin.master.service;

import org.egov.infra.admin.master.entity.Feature;
import org.egov.infra.admin.master.entity.Role;
import org.egov.infra.admin.master.repository.FeatureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class FeatureSpringService {
    @Autowired
    private FeatureRepository featureRepository;

    public List<Feature> getAllFeatures() {
        return featureRepository.findAllByEnabledIsTrueOrderByNameAsc();
    }

    public List<Feature> getAllFeaturesByModuleId(Long moduleId) {
        return featureRepository.findByModuleIdAndEnabledIsTrueOrderByNameAsc(moduleId);
    }

    public Feature getFeatureById(Long id) {
        return featureRepository.findOne(id); // TODO: Migrate to findById for Spring Data JPA 2.x+
    }

    @Transactional
    public Feature saveFeature(Feature feature) {
        return this.featureRepository.save(feature);
    }

    // TODO: Migrate from Struts/XWork: public Long getNumberOfFeatureByRoleAction(Role role, Action action) {
    // TODO: Migrate from Struts/XWork:     return this.featureRepository.countByRolesInAndActionsIn(role, action);
    // TODO: Migrate from Struts/XWork: }
} 