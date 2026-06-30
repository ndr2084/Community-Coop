package com.example.demo.table;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "users")
public class User {
    @Id @Getter private String subject;
    @Getter @Setter private String email;
    @Getter @Setter private String authority;

    public User(){};

    public  User(String subject) {
        this.subject = subject;
    }

    public void setUser(String email, String authority){
        this.email = email;
        this.authority = authority;
    }
}
