package com.example.demo.table;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "profile")
public class Profile {
    @Id
    @Column(name = "subject", nullable = false, length = Integer.MAX_VALUE)
    private String subject;

    @Column(name = "authority", nullable = false, length = Integer.MAX_VALUE)
    private String authority;

    @Column(name = "gmail", nullable = false, length = Integer.MAX_VALUE)
    private String gmail;
    @OneToOne(mappedBy = "profile")
    private Cart cart;

    public Profile(String subject) {
        this.subject = subject;
    }

    public Profile() {

    }

    public void setUser(String email, String authority) {
        this.gmail = email;
        this.authority = authority;
    }

}