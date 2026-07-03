package com.example.demo.table;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "profile_has_shop")
public class ProfileHasShop {
    @EmbeddedId
    private ProfileHasShopId id;

    @MapsId("shopId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "shop_id", nullable = false)
    private Shop shop;

    @MapsId("profileId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "profile_id", nullable = false)
    private Profile profile;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "shop_owner_since")
    private Instant shopOwnerSince;


}