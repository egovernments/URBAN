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

package org.egov.infra.web.struts.interceptors;

// TODO: Migrate from Struts/XWork: // import com.opensymphony.xwork2.ActionInvocation; // TODO: Migrate from Struts/XWork
// TODO: Migrate from Struts/XWork: // import com.opensymphony.xwork2.interceptor.AbstractInterceptor; // TODO: Migrate from Struts/XWork
// TODO: Migrate from Struts/XWork: // import org.apache.struts2.dispatcher.HttpParameters; // TODO: Migrate from Struts/XWork

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

// TODO: Migrate from Struts/XWork: import static org.apache.struts2.StrutsStatics.HTTP_REQUEST;

public class TrimInterceptor {

    private static final long serialVersionUID = 1L;

    // TODO: Migrate from Struts/XWork: @Override
    // TODO: Migrate from Struts/XWork: public String intercept(ActionInvocation invocation) throws Exception {
    public String intercept(Object invocation) throws Exception {
        // TODO: Migrate from Struts/XWork: HttpServletRequest request = (HttpServletRequest) invocation.getInvocationContext().get(HTTP_REQUEST);
        // TODO: Migrate from Struts/XWork: Map<String, String[]> trimmedParameter = new HashMap<>();
        // TODO: Migrate from Struts/XWork: for (String fieldName : invocation.getInvocationContext().getParameters().keySet()) {
        // TODO: Migrate from Struts/XWork: 	String[] values = request.getParameterValues(fieldName);
        // TODO: Migrate from Struts/XWork:     if (values != null) {
        // TODO: Migrate from Struts/XWork:     	for (int index = 0; index < values.length; index++) {
        // TODO: Migrate from Struts/XWork:     		values[index] = values[index].trim();
        // TODO: Migrate from Struts/XWork:         }
        // TODO: Migrate from Struts/XWork:     }
        // TODO: Migrate from Struts/XWork:     trimmedParameter.put(fieldName, values);
        // TODO: Migrate from Struts/XWork: }
        // TODO: Migrate from Struts/XWork: invocation.getInvocationContext().setParameters(HttpParameters.create(trimmedParameter).build());
        // TODO: Migrate from Struts/XWork: return invocation.invoke();
        return null; // TODO: Implement Spring equivalent
    }
}
