package com.example.Euprava.controller;

import com.example.Euprava.auth.TokenBasedAuthentication;
import com.example.Euprava.dto.UserDto;
import com.example.Euprava.model.User;
import com.example.Euprava.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private UserService userService;




    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<User> users = userService.findByDeletedFalse();

        List<UserDto> dtos = new ArrayList<>();
        for (User user : users) {
            dtos.add(new UserDto(user));
        }
        return  new ResponseEntity<>(dtos, HttpStatus.OK);

    }



    @DeleteMapping("/del/{userId}")
    public ResponseEntity<UserDto> deleteUser(@PathVariable Long userId){
        User user = userService.deleted(userId);
        if(user == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        UserDto userDto = new UserDto(user);
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }

}
