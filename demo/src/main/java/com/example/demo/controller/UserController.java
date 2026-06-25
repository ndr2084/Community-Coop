package com.example.demo.controller;

import com.example.demo.entity.Profile;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
class UserController {

    @PostMapping("/create")
    public ResponseEntity<String> createUser(@RequestBody Profile profile) {
        System.out.println(profile);
        return new ResponseEntity<>(HttpStatusCode.valueOf(201));

    }

    @GetMapping("/default")
    public ResponseEntity<String> defaultUser() {
        return ResponseEntity.ok("User Default");
    }



}
