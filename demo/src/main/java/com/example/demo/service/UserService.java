package com.example.demo.service;

import com.example.demo.repository.UserRepository;
import com.example.demo.table.Profile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {


    public UserRepository userRepository;
    public Profile profile;

    @Autowired
    public UserService(UserRepository repository){
        this.userRepository = repository;
        this.profile = new Profile();
    }

    public void createUser(String email, String given_name, String family_name, String authority, String sub, String picture) {
        profile.setGmail(email);
        profile.setFirstName(given_name);
        profile.setLastName(family_name);
        profile.setSubject(sub);
        profile.setAuthority(parseAuthority(authority));
        profile.setPicture(picture);
        userRepository.save(profile);
    }

    public String parseAuthority(String authority) {
        if (authority.contains("ROLE_ADMIN")) {
            return "ROLE_ADMIN";
        }
        return "ROLE_USER";
    }

    public static class SignUpFormAutoFill {
        private final String given_name;
        private final String family_name;
        private final String email;
        private final String picture;

        public SignUpFormAutoFill(String given_name,
                          String family_name,
                          String email,
                          String picture) {
            this.given_name = given_name;
            this.family_name = family_name;
            this.email = email;
            this.picture = picture;
        }

        @Override
        public String toString() {
            return "SignUpForm{" +
                    "given_name='" + given_name + '\'' +
                    ", family_name='" + family_name + '\'' +
                    ", email='" + email + '\'' +
                    ", picture='" + picture + '\'' +
                    '}';
        }

        public String getGiven_name() {
            return given_name;
        }

        public String getFamily_name() {
            return family_name;
        }

        public String getEmail() {
            return email;
        }

        public String getPicture() {
            return picture;
        }

    }
}
