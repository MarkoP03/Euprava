package com.example.health.dto;


import com.example.health.enums.Role;
import com.example.health.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long id;
    private String name;
    private String surname;
    private String username;
    private String email;
    private Role role;
    private boolean deleted;

    public UserDto(User user){

        this.id = user.getId();
        this.name = user.getName();
        this.surname = user.getSurname();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.role = user.getRole();
        this.deleted = user.isDeleted();
    }

}
