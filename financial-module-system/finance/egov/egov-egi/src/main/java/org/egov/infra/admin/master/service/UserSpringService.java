package org.egov.infra.admin.master.service;

import org.egov.infra.admin.master.entity.Role;
import org.egov.infra.admin.master.entity.User;
import org.egov.infra.admin.master.repository.UserRepository;
import org.egov.infra.config.core.ApplicationThreadLocals;
import org.egov.infra.microservice.utils.MicroserviceUtils;
import org.egov.infra.notification.service.NotificationService;
import org.egov.infra.persistence.entity.enums.UserType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.Set;

import static org.egov.infra.config.core.ApplicationThreadLocals.getMunicipalityName;

@Service
@Transactional(readOnly = true)
public class UserSpringService {
    @Value("${user.pwd.expiry.days}")
    private Integer userPasswordExpiryInDays;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MicroserviceUtils microserviceUtils;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    @Qualifier("parentMessageSource")
    private MessageSource messageSource;

    @Transactional
    public User updateUser(User user) {
        return userRepository.saveAndFlush(user);
    }

    @Transactional
    public User createUser(User user) {
        User savedUser = userRepository.save(user);
        microserviceUtils.createUserMicroservice(user);
        return savedUser;
    }

    @Transactional
    public User updateUserPassword(User user, String newPassword) {
        user.setPassword(passwordEncoder.encode(newPassword));
        user.updateNextPwdExpiryDate(userPasswordExpiryInDays);
        updateUser(user);
        User currentUser = getCurrentUser();
        if (!currentUser.equals(user)) {
            String passwordResetMessage = messageSource.getMessage("msg.password.reset",
                    new String[]{user.getName(), currentUser.getName(), getMunicipalityName()}, Locale.getDefault());
            notificationService.sendEmail(user.getEmailId(), "Password Reset", passwordResetMessage);
            notificationService.sendSMS(user.getMobileNumber(), passwordResetMessage);
        }
        return user;
    }

    public Set<Role> getRolesByUsername(String userName) {
        return userRepository.findUserRolesByUserName(userName);
    }

    public User getUserById(Long id) {
        return userRepository.findOne(id); // TODO: Migrate to findById for Spring Data JPA 2.x+
    }

    public User getCurrentUser() {
        return userRepository.findOne(ApplicationThreadLocals.getUserId()); // TODO: Migrate to findById for Spring Data JPA 2.x+
    }

    public User getUserByUsername(String userName) {
        return userRepository.findByUsername(userName);
    }

    public List<User> getUsersByNameLike(String userName) {
        return userRepository.findByNameContainingIgnoreCase(userName);
    }

    public User getUserByEmailId(String emailId) {
        return userRepository.findByEmailId(emailId);
    }

    public User getUserByAadhaarNumber(String aadhaarNumber) {
        return userRepository.findByAadhaarNumber(aadhaarNumber);
    }

    public List<User> getUserByAadhaarNumberAndType(String aadhaarNumber, UserType type) {
        return userRepository.findByAadhaarNumberAndType(aadhaarNumber, type);
    }

    public Optional<User> checkUserWithIdentity(String identity) {
        return Optional.ofNullable(getUserByUsername(identity));
    }

    public List<User> findAllByMatchingUserNameForType(String username, UserType type) {
        return userRepository.findByUsernameContainingIgnoreCaseAndTypeAndActiveTrue(username, type);
    }

    public Set<User> getUsersByRoleName(String roleName) {
        return userRepository.findUsersByRoleName(roleName);
    }

    public List<User> getAllEmployeeNameLike(String name) {
        return userRepository.findByNameContainingIgnoreCaseAndTypeAndActiveTrue(name, UserType.EMPLOYEE);
    }

    public List<User> getUsersByUsernameAndRolename(String userName, String roleName) {
        return userRepository.findUsersByUserAndRoleName(userName, roleName);
    }
} 