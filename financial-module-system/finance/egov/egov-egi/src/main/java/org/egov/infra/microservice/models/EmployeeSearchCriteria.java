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

package org.egov.infra.microservice.models;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.util.CollectionUtils;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@AllArgsConstructor
@Getter
@NoArgsConstructor
@Setter
@ToString
@Builder
public class EmployeeSearchCriteria {
        
        private List<String> codes;
        
        private List<String> names;
        
        private List<String> departments;
        
        private List<String> designations;
        
        private Long asOnDate;

        private List<String> roles;
        
        private List<Long> ids;
        
        private List<String> employeestatuses;
        
        private List<String> employeetypes;
        
        private List<String> uuids;
        
        private List<Long> positions;
        
        private Boolean isActive;
        
        private String tenantId;
        
        private String phone;

        private Integer offset;
        
        private Integer limit;
        
        
        public boolean isCriteriaEmpty(EmployeeSearchCriteria criteria) {
                if(CollectionUtils.isEmpty(criteria.getCodes()) && CollectionUtils.isEmpty(criteria.getNames()) 
                                && CollectionUtils.isEmpty(criteria.getDepartments()) && CollectionUtils.isEmpty(criteria.getDesignations())
                                && CollectionUtils.isEmpty(criteria.getIds()) && CollectionUtils.isEmpty(criteria.getEmployeestatuses())
                                && CollectionUtils.isEmpty(criteria.getEmployeetypes()) && CollectionUtils.isEmpty(criteria.getUuids())
                                && CollectionUtils.isEmpty(criteria.getPositions()) && StringUtils.isEmpty(criteria.getTenantId())
                                && CollectionUtils.isEmpty(criteria.getRoles()) && null == criteria.getAsOnDate()) {
                        return true;
                }else {
                        return false;
                }
        }

        // Manual getter and setter methods since Lombok is not working properly
        public List<String> getCodes() { return codes; }
        public void setCodes(List<String> codes) { this.codes = codes; }
        
        public List<String> getNames() { return names; }
        public void setNames(List<String> names) { this.names = names; }
        
        public List<String> getDepartments() { return departments; }
        public void setDepartments(List<String> departments) { this.departments = departments; }
        
        public List<String> getDesignations() { return designations; }
        public void setDesignations(List<String> designations) { this.designations = designations; }
        
        public Long getAsOnDate() { return asOnDate; }
        public void setAsOnDate(Long asOnDate) { this.asOnDate = asOnDate; }
        
        public List<String> getRoles() { return roles; }
        public void setRoles(List<String> roles) { this.roles = roles; }
        
        public List<Long> getIds() { return ids; }
        public void setIds(List<Long> ids) { this.ids = ids; }
        
        public List<String> getEmployeestatuses() { return employeestatuses; }
        public void setEmployeestatuses(List<String> employeestatuses) { this.employeestatuses = employeestatuses; }
        
        public List<String> getEmployeetypes() { return employeetypes; }
        public void setEmployeetypes(List<String> employeetypes) { this.employeetypes = employeetypes; }
        
        public List<String> getUuids() { return uuids; }
        public void setUuids(List<String> uuids) { this.uuids = uuids; }
        
        public List<Long> getPositions() { return positions; }
        public void setPositions(List<Long> positions) { this.positions = positions; }
        
        public Boolean getIsActive() { return isActive; }
        public void setIsActive(Boolean isActive) { this.isActive = isActive; }
        
        public String getTenantId() { return tenantId; }
        public void setTenantId(String tenantId) { this.tenantId = tenantId; }
        
        public String getPhone() { return phone; }
        public void setPhone(String phone) { this.phone = phone; }
        
        public Integer getOffset() { return offset; }
        public void setOffset(Integer offset) { this.offset = offset; }
        
        public Integer getLimit() { return limit; }
        public void setLimit(Integer limit) { this.limit = limit; }
        
        // Builder method
        public static EmployeeSearchCriteriaBuilder builder() {
            return new EmployeeSearchCriteriaBuilder();
        }
        
        // Builder class
        public static class EmployeeSearchCriteriaBuilder {
            private List<String> codes;
            private List<String> names;
            private List<String> departments;
            private List<String> designations;
            private Long asOnDate;
            private List<String> roles;
            private List<Long> ids;
            private List<String> employeestatuses;
            private List<String> employeetypes;
            private List<String> uuids;
            private List<Long> positions;
            private Boolean isActive;
            private String tenantId;
            private String phone;
            private Integer offset;
            private Integer limit;
            
            public EmployeeSearchCriteriaBuilder codes(List<String> codes) { this.codes = codes; return this; }
            public EmployeeSearchCriteriaBuilder names(List<String> names) { this.names = names; return this; }
            public EmployeeSearchCriteriaBuilder departments(List<String> departments) { this.departments = departments; return this; }
            public EmployeeSearchCriteriaBuilder designations(List<String> designations) { this.designations = designations; return this; }
            public EmployeeSearchCriteriaBuilder asOnDate(Long asOnDate) { this.asOnDate = asOnDate; return this; }
            public EmployeeSearchCriteriaBuilder roles(List<String> roles) { this.roles = roles; return this; }
            public EmployeeSearchCriteriaBuilder ids(List<Long> ids) { this.ids = ids; return this; }
            public EmployeeSearchCriteriaBuilder employeestatuses(List<String> employeestatuses) { this.employeestatuses = employeestatuses; return this; }
            public EmployeeSearchCriteriaBuilder employeetypes(List<String> employeetypes) { this.employeetypes = employeetypes; return this; }
            public EmployeeSearchCriteriaBuilder uuids(List<String> uuids) { this.uuids = uuids; return this; }
            public EmployeeSearchCriteriaBuilder positions(List<Long> positions) { this.positions = positions; return this; }
            public EmployeeSearchCriteriaBuilder isActive(Boolean isActive) { this.isActive = isActive; return this; }
            public EmployeeSearchCriteriaBuilder tenantId(String tenantId) { this.tenantId = tenantId; return this; }
            public EmployeeSearchCriteriaBuilder phone(String phone) { this.phone = phone; return this; }
            public EmployeeSearchCriteriaBuilder offset(Integer offset) { this.offset = offset; return this; }
            public EmployeeSearchCriteriaBuilder limit(Integer limit) { this.limit = limit; return this; }
            
            public EmployeeSearchCriteria build() {
                EmployeeSearchCriteria criteria = new EmployeeSearchCriteria();
                criteria.codes = this.codes;
                criteria.names = this.names;
                criteria.departments = this.departments;
                criteria.designations = this.designations;
                criteria.asOnDate = this.asOnDate;
                criteria.roles = this.roles;
                criteria.ids = this.ids;
                criteria.employeestatuses = this.employeestatuses;
                criteria.employeetypes = this.employeetypes;
                criteria.uuids = this.uuids;
                criteria.positions = this.positions;
                criteria.isActive = this.isActive;
                criteria.tenantId = this.tenantId;
                criteria.phone = this.phone;
                criteria.offset = this.offset;
                criteria.limit = this.limit;
                return criteria;
            }
        }

}
