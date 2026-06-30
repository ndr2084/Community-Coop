package com.example.demo.repository;

import com.example.demo.table.User;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;

public interface UserRepository extends JpaRepositoryImplementation<User, String> {
}
