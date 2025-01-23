package com.ec.controller;

import com.ec.domain.USER_ROLE;
import com.ec.model.User;
import com.ec.request.SignupRequest;
import com.ec.response.AuthResponse;
import com.ec.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("")
public class UserController {

    private final UserService userService;


    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users/profile")
    public ResponseEntity<User> createUserHandler(@RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);


        return ResponseEntity.ok(user);
    }

}
