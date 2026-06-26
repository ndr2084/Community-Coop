package com.example.demo.repository;

import com.example.demo.entity.Profile;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;

public interface ProfileRepository extends JpaRepositoryImplementation<Profile, String> {
}
