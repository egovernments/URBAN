package org.egov.infra.admin.master.service;

import static java.lang.String.format;
import static org.egov.infra.config.core.ApplicationThreadLocals.getDomainName;
import static org.egov.infra.config.core.ApplicationThreadLocals.getDomainURL;
import static org.egov.infra.config.core.ApplicationThreadLocals.getTenantID;
import static org.egov.infra.config.core.ApplicationThreadLocals.getUserTenantId;
import static org.egov.infra.utils.ApplicationConstant.CITY_CODE_KEY;
import static org.egov.infra.utils.ApplicationConstant.CITY_CORP_EMAIL_KEY;
import static org.egov.infra.utils.ApplicationConstant.CITY_CORP_GRADE_KEY;
import static org.egov.infra.utils.ApplicationConstant.CITY_CORP_NAME_KEY;
import static org.egov.infra.utils.ApplicationConstant.CITY_DIST_NAME_KEY;
import static org.egov.infra.utils.ApplicationConstant.CITY_LOGO_FS_UUID_KEY;
import static org.egov.infra.utils.ApplicationConstant.CITY_LOGO_URL;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

import jakarta.annotation.Resource;
import org.apache.commons.lang.StringUtils;
import org.egov.infra.admin.master.entity.City;
import org.egov.infra.admin.master.repository.CityRepository;
import org.egov.infra.notification.service.NotificationService;
import org.egov.infra.utils.ApplicationConstant;
import org.egov.infra.utils.FileStoreUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class CitySpringService {
    private static final String CITY_DATA_CACHE_KEY = "%s-city-pref";
    private static final String CITY_LOGO_CACHE_KEY = "%s-city-logo";
    private static final String CITY_LOGO_HASH_KEY = "city-logo";

    private final CityRepository cityRepository;

    @Autowired
    private NotificationService notificationService;

    @Resource(name = "redisTemplate")
    private HashOperations<String, String, Object> cityPrefCache;

    @Resource(name = "redisTemplate")
    private HashOperations<String, String, Object> cityLogoCache;

    @Autowired
    private RedisTemplate<Object, Object> redisTemplate;

    @Autowired
    private FileStoreUtils fileStoreUtils;
    
    @Value("${city_logo_aws_url}")
    private String city_logo_aws_url;

    @Autowired
    public CitySpringService(final CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    @Transactional
    public City updateCity(City city) {
        redisTemplate.delete(cityPrefCacheKey());
        redisTemplate.delete(cityLogoCacheKey());
        cityDataAsMap();
        return cityRepository.save(city);
    }

    public City getCityByURL(String url) {
        return cityRepository.findByDomainURL(url);
    }

    public City getCityByName(String cityName) {
        return cityRepository.findByName(cityName);
    }

    public City getCityByCode(String code) {
        return cityRepository.findByCode(code);
    }

    public List<City> findAll() {
        return cityRepository.findAll();
    }

    public void sentFeedBackMail(String email, String subject, String message) {
        notificationService.sendEmail(email, subject, message);
    }

    public Map<String, Object> cityDataAsMap() {
        Map<String, Object> cityPrefs = cityPrefCache.entries(cityPrefCacheKey());
        if (cityPrefs.isEmpty()) {
            cityPrefCache.putAll(cityPrefCacheKey(), getCityByURL(getDomainName()).toMap());
            cityPrefs = cityPrefCache.entries(cityPrefCacheKey());
        }
        return cityPrefs;
    }

    public String getCityCode() {
        return (String) cityDataForKey(CITY_CODE_KEY);
    }

    public String getMunicipalityName() {
        return (String) cityDataForKey(CITY_CORP_NAME_KEY);
    }

    public String getCityGrade() {
        return (String) cityDataForKey(CITY_CORP_GRADE_KEY);
    }

    public String getContactEmail() {
        return (String) cityDataForKey(CITY_CORP_EMAIL_KEY);
    }

    public String getDistrictName() {
        return (String) cityDataForKey(CITY_DIST_NAME_KEY);
    }

    public String getCityLogoURL() {
        return format(CITY_LOGO_URL, getDomainURL());
    }

    public byte[] getCityLogoAsBytes() {
        byte[] cityLogo = (byte[]) cityLogoCache.get(cityLogoCacheKey(), CITY_LOGO_HASH_KEY);
        if (cityLogo == null || cityLogo.length < 1) {
//            cityLogo = fileStoreUtils.fileAsByteArray(getCityLogoFileStoreId(), getCityCode());
            String logo_http_url = this.city_logo_aws_url;
            logo_http_url= StringUtils.replace(logo_http_url, ApplicationConstant.CITY_LOGO_URL_REPLACE_KEY, getUserTenantId());
            cityLogo = fileStoreUtils.httpImageAsByteArray(logo_http_url);
            
            cityLogoCache.put(cityLogoCacheKey(), CITY_LOGO_HASH_KEY, cityLogo);
        }
        return cityLogo;
    }

    public InputStream getCityLogoAsStream() {
        return new ByteArrayInputStream(getCityLogoAsBytes());
    }

    public String getCityLogoFileStoreId() {
        return (String) cityDataForKey(CITY_LOGO_FS_UUID_KEY);
    }

    public Object cityDataForKey(String key) {
        return cityPrefCache.get(cityPrefCacheKey(), key);
    }

    private String cityPrefCacheKey() {
        return format(CITY_DATA_CACHE_KEY, getTenantID());
    }

    private String cityLogoCacheKey() {
        return format(CITY_LOGO_CACHE_KEY, getTenantID());
    }
} 