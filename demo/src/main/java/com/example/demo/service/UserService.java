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

    public void createUser(String email, String given_name, String family_name, String sub, String authority) {
        profile.setGmail(email);
        profile.setFirstName(given_name);
        profile.setLastName(family_name);
        profile.setSubject(sub);
        profile.setAuthority(parseAuthority(authority));
        userRepository.save(profile);
    }

    public String parseAuthority(String authority) {
        if (authority.contains("ROLE_ADMIN")) {
            return "ROLE_ADMIN";
        }
        return "ROLE_USER";
    }



    }
