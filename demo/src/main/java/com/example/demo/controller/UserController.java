package com.example.demo.controller;

import com.example.demo.entity.Profile;
import org.springframework.http.HttpStatus;
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

    @GetMapping("/profile")
    public ResponseEntity<Profile> getProfile() {
        HttpStatusCode status = HttpStatusCode.valueOf(200);

        if (status == HttpStatusCode.valueOf(200)) {
            return new ResponseEntity<>(new Profile("nathan", "rous"), status);
        }
        if (status == HttpStatusCode.valueOf(204)) {
            return new ResponseEntity<>(new Profile("", ""), status);
        }
        return new ResponseEntity<>(new Profile("fat", "error"), status);
    }
}
