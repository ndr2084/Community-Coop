package com.example.demo.table;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "profile_profile")
public class ProfileProfile {
    @EmbeddedId
    private ProfileProfileId id;

    @MapsId("subject1")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "subject1", nullable = false)
    private Profile subject1;

    @MapsId("subject2")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "subject2", nullable = false)
    private Profile subject2;


}