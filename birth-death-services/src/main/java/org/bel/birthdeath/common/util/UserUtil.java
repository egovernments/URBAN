package org.bel.birthdeath.common.util;

import org.bel.birthdeath.common.model.user.User;
import org.egov.common.contract.request.RequestInfo;

public class UserUtil {

    public static User convertToCustomUser(org.egov.common.contract.request.User reqUser) {
        if (reqUser == null) return null;

        User user = new User();
        user.setUuid(reqUser.getUuid());
        user.setUserName(reqUser.getUserName());
        user.setName(reqUser.getName());
        user.setType(reqUser.getType());
        user.setMobileNumber(reqUser.getMobileNumber());
        user.setEmailId(reqUser.getEmailId());
        user.setTenantId(reqUser.getTenantId());
        user.setRoles(reqUser.getRoles()); // direct copy since same structure

        return user;
    }
}
