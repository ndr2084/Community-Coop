package com.example.demo.controller;


import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;
import com.example.demo.table.Profile;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/users")
class UserController {

    public UserRepository userRepository;
    public UserService userService;

    UserController(UserRepository userRepository, UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @PutMapping("/create")
    public ResponseEntity<String> createUser(@AuthenticationPrincipal OidcUser oidcUser) {

        String email = oidcUser.getAttribute("email");
        String name = oidcUser.getAttribute("name");
        String familyName = oidcUser.getAttribute("family_name");
        String authority = oidcUser.getAttribute("authority");
        String sub = oidcUser.getAttribute("sub");
        String picture = oidcUser.getAttribute("picture");

        userService.createUser(email, name, authority, sub, picture);


        return new ResponseEntity<>(HttpStatusCode.valueOf(201));
    }

    @GetMapping("/profile")
    public ResponseEntity<String> defaultUser() {
        return null;
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
