package com.example.demo.controller;

import com.example.demo.service.SubjectService;
import com.example.demo.entity.Profile;
import com.example.demo.entity.SignUpForm;
import com.example.demo.repository.ProfileRepository;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/profile")
    public ResponseEntity<String> defaultUser() {
        /*TODO:
         *1. Find way to determine if first and last name are set. This will be forwarded to the frontend, which will handle redriection
         */
        Optional<Profile> profile = profileRepository.findById(subjectService.getSubject());
        if (profile.isPresent()) {
            return new ResponseEntity<>(subjectService.getSubject(), HttpStatusCode.valueOf(200));
        }
        return new ResponseEntity<>(HttpStatusCode.valueOf(404));
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
