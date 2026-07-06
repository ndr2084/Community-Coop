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

import java.net.URI;
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

        if (
                !userService.createUser(email, name, familyName, authority, sub, picture)) {
            System.out.println("User doesn't exist 1");


            /*THESE FIELD NAMES MUST MATCH THE FIELD NAMES DEFINED IN ANGULAR SIGNUPFORMAUTOFILL INTERFACE*/
            record SignUpFormAutoFill(String name, String familyName, String email, String picture) {
            }


            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new SignUpFormAutoFill(name, familyName, email, picture));
        }

        //TODO: 1.0 - REDIRECT TO DIFFERENT PAGE IF USER ALREADY EXISTS
        //TODO: 1.1 - FIGURE OUT WHY MECHANISM IS NOT WORKING BELOW
        System.out.println("User already exists 2");
        assert sub != null;
        return ResponseEntity
                .status(HttpStatus.ACCEPTED)
                .body(userRepository.findById(sub));
    }

}
