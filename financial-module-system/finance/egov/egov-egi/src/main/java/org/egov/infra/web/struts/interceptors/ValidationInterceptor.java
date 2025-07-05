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
// TODO: Migrate from Struts/XWork: // import com.opensymphony.xwork2.interceptor.ValidationAware; // TODO: Migrate from Struts/XWork
import org.egov.infra.validation.exception.ValidationError;
import org.egov.infra.validation.exception.ValidationException;
// TODO: Migrate from Struts/XWork: import org.egov.infra.web.struts.actions.BaseFormAction;
import org.egov.infra.web.struts.annotation.ValidationErrorPage;
import org.egov.infra.web.struts.annotation.ValidationErrorPageExt;
import org.egov.infra.web.struts.annotation.ValidationErrorPageForward;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.List;
import java.util.stream.Stream;

// TODO: Migrate from Struts/XWork: import static org.apache.struts2.StrutsStatics.HTTP_REQUEST;
import static org.egov.infra.security.utils.XSSValidator.validate;

public class ValidationInterceptor {

	private static final long serialVersionUID = 1L;

	// TODO: Migrate from Struts/XWork: @Override
	// TODO: Migrate from Struts/XWork: public String intercept(final ActionInvocation invocation) throws Exception {
	public String intercept(final Object invocation) throws Exception {
		// TODO: Migrate from Struts/XWork: String form = "edit";
		// TODO: Migrate from Struts/XWork: Method actionMethod = null;
		// TODO: Migrate from Struts/XWork: final Object action = invocation.getAction();
		// TODO: Migrate from Struts/XWork: boolean isInvokeAndForward = false;
		// TODO: Migrate from Struts/XWork: try {
		// TODO: Migrate from Struts/XWork: 	final String method = invocation.getProxy().getMethod();
		// TODO: Migrate from Struts/XWork: 	if ("create".equals(method)) {
		// TODO: Migrate from Struts/XWork: 		form = "new";
		// TODO: Migrate from Struts/XWork: 	}
		// TODO: Migrate from Struts/XWork: 	final Method m = action.getClass().getMethod(method);
		// TODO: Migrate from Struts/XWork: 
		// TODO: Migrate from Struts/XWork: 	if (m.isAnnotationPresent(ValidationErrorPage.class)) {
		// TODO: Migrate from Struts/XWork: 		form = m.getAnnotation(ValidationErrorPage.class).value();
		// TODO: Migrate from Struts/XWork: 	} else if (m.isAnnotationPresent(ValidationErrorPageExt.class)) {
		// TODO: Migrate from Struts/XWork: 		final ValidationErrorPageExt validationErrorPageExt = m.getAnnotation(ValidationErrorPageExt.class);
		// TODO: Migrate from Struts/XWork: 		form = validationErrorPageExt.action();
		// TODO: Migrate from Struts/XWork: 		if (validationErrorPageExt.makeCall()) {
		// TODO: Migrate from Struts/XWork: 			actionMethod = action.getClass().getMethod(validationErrorPageExt.toMethod());
		// TODO: Migrate from Struts/XWork: 		}
		// TODO: Migrate from Struts/XWork: 	} else if (m.isAnnotationPresent(ValidationErrorPageForward.class)) {
		// TODO: Migrate from Struts/XWork: 		final ValidationErrorPageForward forwarder = m.getAnnotation(ValidationErrorPageForward.class);
		// TODO: Migrate from Struts/XWork: 		actionMethod = action.getClass().getDeclaredMethod(forwarder.forwarderMethod());
		// TODO: Migrate from Struts/XWork: 		isInvokeAndForward = true;
		// TODO: Migrate from Struts/XWork: 	}
		// TODO: Migrate from Struts/XWork: 
		// TODO: Migrate from Struts/XWork:     HttpServletRequest request = (HttpServletRequest) invocation.getInvocationContext().get(HTTP_REQUEST);
		// TODO: Migrate from Struts/XWork:     invocation.getInvocationContext().getParameters().keySet().stream().forEach(fieldName -> {
		// TODO: Migrate from Struts/XWork:         String[] paramValues = request.getParameterValues(fieldName);
		// TODO: Migrate from Struts/XWork:         if (paramValues != null)
		// TODO: Migrate from Struts/XWork:             Stream.of(paramValues).forEach(value -> validate(fieldName, value));
		// TODO: Migrate from Struts/XWork:     });
		// TODO: Migrate from Struts/XWork: 
		// TODO: Migrate from Struts/XWork:             ValidationAware validationAwareAction = (ValidationAware) invocation.getAction();
		// TODO: Migrate from Struts/XWork:             if (validationAwareAction.hasErrors()) {
		// TODO: Migrate from Struts/XWork:                 if (isInvokeAndForward) {
		// TODO: Migrate from Struts/XWork:                     return (String) actionMethod.invoke(action);
		// TODO: Migrate from Struts/XWork:                 } else {
		// TODO: Migrate from Struts/XWork:                     this.invokeActionMethod(actionMethod, action);
		// TODO: Migrate from Struts/XWork:                     return form;
		// TODO: Migrate from Struts/XWork:                 }
		// TODO: Migrate from Struts/XWork:             }
		// TODO: Migrate from Struts/XWork:             return invocation.invoke();
		// TODO: Migrate from Struts/XWork:         } catch (ValidationException e) {
		// TODO: Migrate from Struts/XWork:             if (BaseFormAction.class.isAssignableFrom(invocation.getAction().getClass())) {
		// TODO: Migrate from Struts/XWork:                 this.transformValidationErrors(invocation, e);
		// TODO: Migrate from Struts/XWork:                 if (isInvokeAndForward) {
		// TODO: Migrate from Struts/XWork:                     return (String) actionMethod.invoke(action);
		// TODO: Migrate from Struts/XWork:                 } else {
		// TODO: Migrate from Struts/XWork:                     this.invokeActionMethod(actionMethod, action);
		// TODO: Migrate from Struts/XWork:                     return form;
		// TODO: Migrate from Struts/XWork:                 }
		// TODO: Migrate from Struts/XWork:             }
		// TODO: Migrate from Struts/XWork:             throw e;
		// TODO: Migrate from Struts/XWork:         }
		return null; // TODO: Implement Spring equivalent
	}

    // TODO: Migrate from Struts/XWork:
    // private void invokeActionMethod(Method actionMethod, Object action) throws IllegalAccessException,
    //         InvocationTargetException {
    //     if (actionMethod != null) {
    //         actionMethod.setAccessible(true);
    //         actionMethod.invoke(action);
    //     }
    // }

    // TODO: Migrate from Struts/XWork:
    // private void transformValidationErrors(ActionInvocation invocation, ValidationException ve) {
    //     BaseFormAction action = (BaseFormAction) invocation.getAction();
    //     List<ValidationError> errors = ve.getErrors();
    //     for (ValidationError error : errors) {
    //         if (error.getArgs() == null || error.getArgs().length == 0) {
    //             if (error.isNonFieldError())
    //                 action.addActionError(action.getText(error.getMessage(), error.getMessage()));
    //             else
    //                 action.addFieldError("model." + error.getKey(), action.getText(error.getMessage(), error.getMessage()));
    //         } else {
    //             if (error.isNonFieldError())
    //                 action.addActionError(action.getText(error.getMessage(), error.getMessage(), error.getArgs()));
    //             else
    //                 action.addFieldError("model." + error.getKey(), action.getText(error.getMessage(), error.getMessage(), error.getArgs()));
    //         }
    //     }
    // }

}