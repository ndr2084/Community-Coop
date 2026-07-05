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

    public boolean createUser(String email, String given_name, String family_name, String authority, String sub, String picture) {

        if(userExists(sub)) {
            System.out.println("User already exists 1");
            return true;
        }

        profile.setGmail(email);
        profile.setFirstName(given_name);
        profile.setLastName(family_name);
        profile.setSubject(sub);
        profile.setAuthority(parseAuthority(authority));
        profile.setPicture(picture);
        userRepository.save(profile);
        return false;
    }

    public String parseAuthority(String authority) {
        if (authority.contains("ROLE_ADMIN")) {
            return "ROLE_ADMIN";
        }
        return "ROLE_USER";
    }

        public boolean userExists(String id) {
            return userRepository.existsById(id);
        }
}
