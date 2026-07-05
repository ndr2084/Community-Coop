package com.example.demo.controller;


import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;
import com.example.demo.table.Profile;
import org.springframework.http.HttpStatus;
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

    @GetMapping("/profile")
    public ResponseEntity<?> createUser(@AuthenticationPrincipal OidcUser oidcUser) {

        String email = oidcUser.getAttribute("email");
        String name = oidcUser.getGivenName();
        String familyName = oidcUser.getAttribute("family_name");
        String sub = oidcUser.getAttribute("sub");
        String authority = oidcUser.getAuthorities().toString();
        String picture = oidcUser.getPicture();


        userService.createUser(email, name, familyName, authority, sub, picture);


        /*THESE FIELD NAMES MUST MATCH THE FIELD NAMES DEFINED IN ANGULAR SIGNUPFORMAUTOFILL INTERFACE*/
        record SignUpFormAutoFill(String name, String familyName, String email, String picture) {}

        System.out.println(picture);


        return ResponseEntity.ok(new SignUpFormAutoFill(name, familyName, email, picture));

    }
}
