package com.example.demo.table;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "shop")
public class Shop {
    @Id
    @Column(name = "shop_id", nullable = false, length = Integer.MAX_VALUE)
    private String shopId;

    @Column(name = "shop_name", length = Integer.MAX_VALUE)
    private String shopName;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "created_at")
    private Instant createdAt;

    @OneToMany(mappedBy = "shop")
    private Set<ProfileHasShop> profileHasShops = new LinkedHashSet<>();

    @OneToMany(mappedBy = "shop")
    private Set<ShopSellsItem> shopSellsItems = new LinkedHashSet<>();


}