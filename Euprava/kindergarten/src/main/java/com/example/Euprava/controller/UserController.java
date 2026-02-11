package com.example.Euprava.controller;

import com.example.Euprava.dto.UserDto;
import com.example.Euprava.dto.security.UserRequest;
import com.example.Euprava.model.User;
import com.example.Euprava.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<User> users = userService.findAllActive();

        List<UserDto> dtos = new ArrayList<>();
        for (User user : users) {
            dtos.add(new UserDto(user));
        }

        return ResponseEntity.ok(dtos);
    }
    @GetMapping("/teachers")
    public ResponseEntity<List<UserDto>> getTeachers() {
        List<User> teachers = userService.findTeachers();

        List<UserDto> dtos = new ArrayList<>();
        for (User teacher : teachers) {
            dtos.add(new UserDto(teacher));
        }

        return ResponseEntity.ok(dtos);
    }


    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUser(
            @PathVariable Long id,
            @RequestBody UserDto dto) {

        User updated = mapToEntity(dto);
        User result = userService.update(id, updated);

        if (result == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(new UserDto(result));
    }

    @DeleteMapping("/del/{id}")
    public ResponseEntity<UserDto> deleteUser(@PathVariable Long id) {
        User deleted = userService.softDelete(id);
        if (deleted == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(new UserDto(deleted));
    }

    @GetMapping("/whoami")
    public ResponseEntity<UserDto> whoami() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }

        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(new UserDto(user));
    }


    private User mapToEntity(UserDto dto) {
        User user = new User();
        user.setName(dto.getName());
        user.setSurname(dto.getSurname());
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setRole(dto.getRole());
        return user;
    }
}