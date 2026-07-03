package com.example.demo.repository;

import com.example.demo.table.Profile;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;

public interface UserRepository extends JpaRepositoryImplementation<Profile, String> {
}
