package com.example.demo.service;

import com.example.demo.repository.UserRepository;
import com.example.demo.table.Profile;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    public UserRepository userRepository;

    public UserService(UserRepository repository){
        this.userRepository = repository;
    }

    public void setFirstAndLastName(String firstName, String lastName){

    }

    public void setAuthority(String authority){

    }

    public void setEmail(String email){

    }

    public void setLastLogin(String lastLogin){

    }


}
