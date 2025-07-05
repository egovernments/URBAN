// TODO: Refactor Struts usage in this file for Spring migration
/*
 *    eGov  SmartCity eGovernance suite aims to improve the internal efficiency,transparency,
 *    accountability and the service delivery of the government  organizations.
 *
 *     Copyright (C) 2017  eGovernments Foundation
 *
 *     The updated version of eGov suite of products as by eGovernments Foundation
 *     is available at http://www.egovernments.org
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program. If not, see http://www.gnu.org/licenses/ or
 *     http://www.gnu.org/licenses/gpl.html .
 *
 *     In addition to the terms of the GPL license to be adhered to in using this
 *     program, the following additional terms are to be complied with:
 *
 *         1) All versions of this program, verbatim or modified must carry this
 *            Legal Notice.
 *            Further, all user interfaces, including but not limited to citizen facing interfaces,
 *            Urban Local Bodies interfaces, dashboards, mobile applications, of the program and any
 *            derived works should carry eGovernments Foundation logo on the top right corner.
 *
 *            For the logo, please refer http://egovernments.org/html/logo/egov_logo.png.
 *            For any further queries on attribution, including queries on brand guidelines,
 *            please contact contact@egovernments.org
 *
 *         2) Any misrepresentation of the origin of the material is prohibited. It
 *            is required that all modified versions of this material be marked in
 *            reasonable ways as different from the original version.
 *
 *         3) This license does not grant any rights to any user of the program
 *            with regards to rights under trademark law for use of the trade names
 *            or trademarks of eGovernments Foundation.
 *
 *   In case of any queries, you can reach eGovernments Foundation at contact@egovernments.org.
 *
 */

package org.egov.infra.web.struts.parser;

// TODO: Migrate from Struts/XWork: // import org.apache.struts2.dispatcher.multipart.MultiPartRequest; // TODO: Migrate from Struts/XWork
// TODO: Migrate from Struts/XWork: // import org.apache.struts2.dispatcher.multipart.StrutsUploadedFile; // TODO: Migrate from Struts/XWork
// TODO: Migrate from Struts/XWork: // import org.apache.struts2.dispatcher.multipart.UploadedFile; // TODO: Migrate from Struts/XWork
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Enumeration;
import java.util.List;
import java.util.Map.Entry;
import java.util.UUID;

/**
 * @author subhash
 */
public class SpringMultipartParser {

    private static final Logger LOG = LoggerFactory.getLogger(SpringMultipartParser.class);

    private List<String> errors = new ArrayList<>();

    private MultiValueMap<String, MultipartFile> multipartMap;

    private MultipartHttpServletRequest multipartRequest;

    private MultiValueMap<String, File> multiFileMap = new LinkedMultiValueMap<>();

    public void parse(HttpServletRequest request, String saveDir) throws IOException {
        multipartRequest = WebUtils.getNativeRequest(request, MultipartHttpServletRequest.class);

        if (multipartRequest == null) {
            LOG.warn("Unable to MultipartHttpServletRequest");
            errors.add("Unable to MultipartHttpServletRequest");
            return;
        }

        multipartMap = multipartRequest.getMultiFileMap();
        for (Entry<String, List<MultipartFile>> fileEntry : multipartMap.entrySet()) {
            String fieldName = fileEntry.getKey();
            for (MultipartFile file : fileEntry.getValue()) {
                if (!file.isEmpty()) {
                    Path tempFile = Files.createTempFile(UUID.randomUUID().toString(), ".dat");
                    try (InputStream input = file.getInputStream()) {
                        Files.copy(input, tempFile, StandardCopyOption.REPLACE_EXISTING);
                    }
                    multiFileMap.add(fieldName, tempFile.toFile());
                }
            }
        }
    }

    public Enumeration<String> getFileParameterNames() {
        return Collections.enumeration(multipartMap.keySet());
    }

    public String[] getContentType(String fieldName) {
        List<MultipartFile> files = multipartMap.get(fieldName);
        String[] contentTypes = null;
        if (files != null) {
            contentTypes = new String[files.size()];
            int size = 0;
            for (MultipartFile file : files) {
                contentTypes[size++] = file.getContentType();
            }
        }
        return contentTypes;
    }

    // TODO: Migrate from Struts/XWork - replaced UploadedFile with Spring MultipartFile
    public MultipartFile[] getFile(String fieldName) {
        List<MultipartFile> files = multipartMap.get(fieldName);
        MultipartFile[] uploadedFiles = null;
        if (files != null) {
            uploadedFiles = files.toArray(new MultipartFile[0]);
        }
        return uploadedFiles;
    }

    public String[] getFileNames(String fieldName) {
        List<MultipartFile> files = multipartMap.get(fieldName);
        String[] fileNames = null;
        if (files != null) {
            fileNames = new String[files.size()];
            int size = 0;
            for (MultipartFile file : files) {
                fileNames[size++] = file.getOriginalFilename();
            }
        }
        return fileNames;
    }

    public String[] getFilesystemName(String fieldName) {
        List<File> files = multiFileMap.get(fieldName);
        String[] fileNames = null;
        if (files != null) {
            fileNames = new String[files.size()];
            int size = 0;
            for (File file : files) {
                fileNames[size++] = file.getName();
            }
        }
        return fileNames;
    }

    public String getParameter(String name) {
        return multipartRequest.getParameter(name);
    }

    public Enumeration<String> getParameterNames() {
        return multipartRequest.getParameterNames();
    }

    public String[] getParameterValues(String name) {
        return multipartRequest.getParameterValues(name);
    }

    public List getErrors() {
        return errors;
    }

    public void cleanUp() {
        for (List<File> files : multiFileMap.values()) {
            for (File file : files) {
                try {
                    Files.deleteIfExists(file.toPath());
                } catch (IOException e) {
                    LOG.warn("Error occurred while file cleanup in struts multipart parser", e);
                }
            }
        }
    }
}
