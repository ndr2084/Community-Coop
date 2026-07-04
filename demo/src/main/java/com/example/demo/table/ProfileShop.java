package com.example.demo.table;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "profile_shop")
public class ProfileShop {
    @EmbeddedId
    private ProfileShopId id;

    @MapsId("subject")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "subject", nullable = false)
    private Profile subject;

    @Column(name = "owner_since", nullable = false)
    private Instant ownerSince;


}