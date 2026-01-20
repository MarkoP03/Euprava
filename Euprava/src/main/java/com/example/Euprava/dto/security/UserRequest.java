package com.example.Euprava.dto.security;

import com.example.Euprava.enums.Role;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
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
