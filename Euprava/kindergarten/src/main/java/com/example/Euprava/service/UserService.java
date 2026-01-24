package com.example.Euprava.service;


import com.example.Euprava.dto.security.UserRequest;
import com.example.Euprava.model.User;
import com.example.Euprava.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;


    public List<User> getAll() {
        return userRepository.findAll();
    }

    public User getById(long id) {
        return userRepository.findById(id).orElse(null);
    }


    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public List<User> findByDeletedFalse() {
        return userRepository.findByDeletedFalse();
    }

    public User save(UserRequest userRequest) {
        if (userRequest == null || userRequest.getEmail() == null) {
            throw new RuntimeException("Email is required.");
        }
        if (userRepository.existsByEmail(userRequest.getEmail())) {
            throw new RuntimeException("Email already exists!");
        }
        if (userRequest.getUsername() == null) {
            throw new RuntimeException("Username is required.");
        }
        if (userRequest.getPassword() == null) {
            throw new RuntimeException("Password is required.");
        }
        if (userRequest.getRole() == null) {
            throw new RuntimeException("Role is required.");
        }


        User nu = new User();
        nu.setName(userRequest.getName());
        nu.setSurname(userRequest.getSurname());
        nu.setUsername(userRequest.getUsername());
        nu.setPassword(userRequest.getPassword());
        nu.setEmail(userRequest.getEmail());
        nu.setRole(userRequest.getRole());
        nu.setDeleted(false);

        return userRepository.save(nu);
    }

    public User deleted(Long id) {
        User u = userRepository.findById(id).orElse(null);
        if (u == null) {
            return null;
        }
        u.setDeleted(true);
        userRepository.save(u);
        return u;
    }
}
