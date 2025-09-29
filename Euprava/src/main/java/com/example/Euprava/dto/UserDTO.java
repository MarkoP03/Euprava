package com.example.Euprava.dto;


import com.example.Euprava.enums.Role;
import com.example.Euprava.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long id;
    private String name;
    private String surname;
    private String username;
    private String email;
    private Role role;
    private boolean deleted;

    UserDTO (User user){

        this.id = user.getId();
        this.name = user.getName();
        this.surname = user.getSurname();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.role = user.getRole();
        this.deleted = user.isDeleted();
    }



}
