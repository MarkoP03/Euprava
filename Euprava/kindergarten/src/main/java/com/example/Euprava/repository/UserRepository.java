package com.example.Euprava.repository;

import com.example.Euprava.enums.Role;
import com.example.Euprava.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    User findByUsername(String username);
    boolean existsByEmail(String email);

    List<User> findByDeletedFalse();
    List<User> findByRoleAndDeletedFalse(Role role);
}
