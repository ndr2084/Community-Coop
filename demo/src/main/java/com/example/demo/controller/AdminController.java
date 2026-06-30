package com.example.demo.controller;

import com.example.demo.table.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import java.net.URISyntaxException;

@RestController
@RequestMapping("/admin")
class AdminController {

    @GetMapping("/default")
    public ResponseEntity<User> admin() throws URISyntaxException {
        return null;
    }
}
