package com.ec.controller;

import com.ec.response.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/home")
public class HomeController {

    @GetMapping("")
    public ApiResponse homeControllerHandler(){
        ApiResponse msg = new ApiResponse();
        msg.setMessage("Welcome to Multivendor Ecommerce");
        return msg;
    }

}
