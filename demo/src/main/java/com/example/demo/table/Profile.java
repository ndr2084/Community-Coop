package com.example.demo.table;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Data
@RequiredArgsConstructor
public class Profile{



    @SuppressWarnings("unused")
    private @Id String subject;
    private final String firstName, lastName;
    public Profile() {
        this.firstName = null;
        this.lastName = null;
    }



}
