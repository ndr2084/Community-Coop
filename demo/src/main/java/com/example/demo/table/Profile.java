package com.example.demo.table;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.LinkedHashSet;
import java.util.Set;

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

    @OneToMany
    @JoinColumn(name = "profile_id")
    private Set<Cart> carts = new LinkedHashSet<>();

    @ManyToMany
    @JoinTable(name = "cart_has_item", joinColumns = {@JoinColumn(name = "profile_id")}, inverseJoinColumns = {@JoinColumn(name = "item_id")})
    private Set<Item> items = new LinkedHashSet<>();

    @OneToMany
    @JoinColumn(name = "profile_id")
    private Set<ProfileHasShop> profileHasShops = new LinkedHashSet<>();


}