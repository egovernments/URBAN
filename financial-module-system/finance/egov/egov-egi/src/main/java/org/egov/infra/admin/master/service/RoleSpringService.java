package org.egov.infra.admin.master.service;

import org.egov.infra.admin.master.entity.Role;
import org.egov.infra.admin.master.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class RoleSpringService {
    private final RoleRepository roleRepository;

    @Autowired
    public RoleSpringService(final RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Transactional
    public void createRole(final Role role) {
        roleRepository.saveAndFlush(role);
    }

    @Transactional
    public void update(final Role role) {
        roleRepository.saveAndFlush(role);
    }

    @Transactional
    public void remove(final Role role) {
        roleRepository.delete(role);
    }

    public List<Role> getAllRoles() {
        return roleRepository.findAll(new Sort(Sort.Direction.ASC, "name")); // TODO: Migrate to Sort.by for Spring Data JPA 2.x+
    }

    public List<Role> getNonInternalRoles() {
        return roleRepository.findByInternalIsFalse(new Sort(Sort.Direction.ASC, "name")); // TODO: Migrate to Sort.by for Spring Data JPA 2.x+
    }

    public Role getRoleById(final Long roleID) {
        return roleRepository.findOne(roleID); // TODO: Migrate to findById for Spring Data JPA 2.x+
    }

    public Role getRoleByName(final String name) {
        return roleRepository.findByName(name);
    }

    public Role load(final Long id) {
        return roleRepository.getOne(id); // TODO: Migrate to getById for Spring Data JPA 2.x+
    }
} 