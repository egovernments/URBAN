// TODO: Refactor Struts usage in this file for Spring migration
package org.egov.infra.web.struts.interceptors;

import java.util.Locale;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class CustomI18nInterceptor extends LocaleChangeInterceptor {
    private static final Logger LOG = LogManager.getLogger(CustomI18nInterceptor.class);
    
    @Autowired
    private LocaleResolver localeResolver;
    
    private LocaleResolver getLocaleResolver() {
        return localeResolver;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        LOG.debug("Intercepting request for locale handling");
        
        LocaleResolver localeResolver = getLocaleResolver();
        if (localeResolver == null) {
            throw new IllegalStateException("No LocaleResolver found: not in a DispatcherServlet request?");
        }

        Locale locale = localeResolver.resolveLocale(request);
        
        // Custom logic: always use English as country code
        if (locale != null) {
            locale = new Locale(locale.getLanguage(), "EN");
            localeResolver.setLocale(request, response, locale);
        }

        if (LOG.isDebugEnabled()) {
            LOG.debug("Before request processing Locale={}", locale);
        }

        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
        if (LOG.isDebugEnabled()) {
            LocaleResolver localeResolver = getLocaleResolver();
            if (localeResolver != null) {
                Locale locale = localeResolver.resolveLocale(request);
                LOG.debug("After request processing Locale={}", locale);
            }
        }
    }
}
