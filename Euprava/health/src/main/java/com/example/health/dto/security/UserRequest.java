package com.example.health.dto.security;

import com.example.health.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {

    private Long id;
    private String name;
    private String surname;
    private String username;
    private String email;
    private Role role;
    private String password;
}
