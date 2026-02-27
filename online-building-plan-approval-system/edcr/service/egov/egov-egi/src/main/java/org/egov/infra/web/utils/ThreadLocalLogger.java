package org.egov.infra.web.utils;
import org.egov.infra.config.core.ApplicationThreadLocals;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ThreadLocalLogger {

    private static final Logger logger = LoggerFactory.getLogger(ThreadLocalLogger.class);

    public static void logAllThreadLocalValues(String context) {
        logger.info("========== [{}] ApplicationThreadLocals ==========", context);
        logger.info("Thread: {}", Thread.currentThread().getName());

        logger.info("domainName          : {}", ApplicationThreadLocals.getDomainName());
        logger.info("userId              : {}", ApplicationThreadLocals.getUserId());
        logger.info("tenantID            : {}", ApplicationThreadLocals.getTenantID());
        logger.info("cityCode            : {}", ApplicationThreadLocals.getCityCode());
        logger.info("cityName            : {}", ApplicationThreadLocals.getCityName());
        logger.info("municipalityName    : {}", ApplicationThreadLocals.getMunicipalityName());
        logger.info("domainURL           : {}", ApplicationThreadLocals.getDomainURL());
        logger.info("cityNameLocal       : {}", ApplicationThreadLocals.getCityNameLocal());
        logger.info("districtName        : {}", ApplicationThreadLocals.getDistrictName());
        logger.info("districtCode        : {}", ApplicationThreadLocals.getDistrictCode());
        logger.info("stateName           : {}", ApplicationThreadLocals.getStateName());
        logger.info("grade               : {}", ApplicationThreadLocals.getGrade());
        logger.info("fullTenantID        : {}", ApplicationThreadLocals.getFullTenantID());
        logger.info("filestoreTenantID   : {}", ApplicationThreadLocals.getFilestoreTenantID());

        logger.info("==================================================");
    }
}
