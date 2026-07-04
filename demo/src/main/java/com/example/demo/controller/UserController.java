package com.example.demo.controller;


import com.example.demo.configuration.ResourceOwnerConfiguration;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;
import com.example.demo.table.Profile;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/users")
class UserController {

    public UserRepository userRepository;
    public ResourceOwnerConfiguration resourceOwnerConfiguration;
    public UserService userService;

    UserController(UserRepository userRepository, ResourceOwnerConfiguration resourceOwnerConfiguration, UserService userService) {
        this.userRepository = userRepository;
        this.resourceOwnerConfiguration = resourceOwnerConfiguration;
        this.userService = userService;
    }

    @PutMapping("/create")
    public ResponseEntity<String> createUser(@RequestBody Profile profile) {
        userService.setFirstAndLastName(profile.getFirstName(), profile.getLastName());

        return new ResponseEntity<>(HttpStatusCode.valueOf(201));
    }

    @GetMapping("/profile")
    public ResponseEntity<String> defaultUser() {
        /*TODO:
         *1. Find way to determine if first and last name are set. This will be forwarded to the frontend, which will handle redriection
         */
        Optional<Profile> user = userRepository.findById(resourceOwnerConfiguration.getOpaqueToken());
        if (user.isPresent()) {
            return new ResponseEntity<>(resourceOwnerConfiguration.getOpaqueToken(), HttpStatusCode.valueOf(200));
        }
        return new ResponseEntity<>(HttpStatusCode.valueOf(404));
    }

    /*
    @PutMapping("/profile")
    public void createProfile(@RequestBody SignUpForm signUpForm) {
        System.out.println(resourceOwnerConfiguration.getOpaqueToken());
        Optional<User> profile = userRepository.findById(resourceOwnerConfiguration.getOpaqueToken());
        if (profile.isPresent()) {
            profile.get().setFirstName(signUpForm.firstName());
            profile.get().setLastName(signUpForm.lastName());
            userRepository.save(profile.get());
        }
    }
    */
}
