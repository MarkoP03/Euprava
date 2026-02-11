package com.example.health.repository;

import com.example.health.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    boolean existsByEmail(String email);
    User findByUsername(String username);
    List<User> findByDeletedFalse();
}
