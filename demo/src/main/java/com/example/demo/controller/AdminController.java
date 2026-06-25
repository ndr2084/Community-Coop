package com.example.demo.controller;

import com.example.demo.entity.User;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequestMapping("/admin")
class AdminController {

    @GetMapping("/default")
    public ResponseEntity<User> admin() throws URISyntaxException {
        HttpHeaders headers = new HttpHeaders();
        User user = new User("superSecretEmail@Geroge.com");
        return new ResponseEntity<>(user, HttpStatus.CREATED);

    }
}
