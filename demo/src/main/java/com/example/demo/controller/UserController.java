package com.example.demo.controller;

import com.example.demo.SubjectService;
import com.example.demo.entity.Profile;
import com.example.demo.entity.SignUpForm;
import com.example.demo.repository.ProfileRepository;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/users")
class UserController {

    public ProfileRepository profileRepository;
    public SubjectService subjectService;

    UserController(ProfileRepository profileRepository, SubjectService subjectService) {
        this.profileRepository = profileRepository;
        this.subjectService = subjectService;
    }

    @PutMapping("/create")
    public ResponseEntity<String> createUser(@RequestBody Profile profile) {
        System.out.println(profile);
        return new ResponseEntity<>(HttpStatusCode.valueOf(201));

    }

    @GetMapping("/default")
    public ResponseEntity<String> defaultUser() {
        return ResponseEntity.ok("User Default");
    }

    @PutMapping("/profile")
    public void createProfile(@RequestBody SignUpForm signUpForm) {
        System.out.println(subjectService.getSubject());
        Optional<Profile> profile = profileRepository.findById(subjectService.getSubject());
        if (profile.isPresent()) {
            profile.get().setFirstName(signUpForm.firstName());
            profile.get().setLastName(signUpForm.lastName());
            profileRepository.save(profile.get());
        }

    }
}
