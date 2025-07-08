package org.bel.birthdeath.common.contract;

public interface UserOwnerSearchCriteria {

    String getTenantid();
    ParentInfo getFatherInfo(); // Generic access to father's info
}
