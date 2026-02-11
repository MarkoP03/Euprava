package com.example.health.service;


import com.example.health.exception.BadRequestException;
import com.example.health.model.User;
import com.example.health.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<User> findAllActive() {
        return userRepository.findByDeletedFalse();
    }

    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }


    public User save(User user, String password) {
        if (user == null) {
            throw new BadRequestException("User payload is required");
        }
        if (user.getEmail() == null || user.getEmail().isBlank()) {
            throw new BadRequestException("Email is required");
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new BadRequestException("Email already exists");
        }
        if (user.getUsername() == null || user.getUsername().isBlank()) {
            throw new BadRequestException("Username is required");
        }
        if (password == null || password.isBlank()) {
            throw new BadRequestException("Password is required");
        }
        if (user.getRole() == null) {
            throw new BadRequestException("Role is required");
        }

        user.setId(null);
        user.setPassword(passwordEncoder.encode(password));
        user.setDeleted(false);

        return userRepository.save(user);
    }

    public User update(Long id, User updated) {
        User existing = userRepository.findById(id).orElse(null);
        if (existing == null) {
            throw new BadRequestException("User not found");
        }

        existing.setName(updated.getName());
        existing.setSurname(updated.getSurname());
        existing.setUsername(updated.getUsername());
        existing.setEmail(updated.getEmail());
        existing.setRole(updated.getRole());

        return userRepository.save(existing);
    }

    public User updatePassword(Long id, String newPassword) {
        User existing = userRepository.findById(id).orElse(null);
        if (existing == null) {
            throw new BadRequestException("User not found");
        }
        if (newPassword == null || newPassword.isBlank()) {
            throw new BadRequestException("Password is required");
        }

        existing.setPassword(passwordEncoder.encode(newPassword));
        return userRepository.save(existing);
    }

    public User softDelete(Long id) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) {
            throw new BadRequestException("User not found");
        }

        user.setDeleted(true);
        return userRepository.save(user);
    }
}