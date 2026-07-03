package com.example.demo.table;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "item")
public class Item {
    @Id
    @Column(name = "item_id", nullable = false, length = Integer.MAX_VALUE)
    private String itemId;

    @Column(name = "item_price", nullable = false)
    private Integer itemPrice;

    @Column(name = "item_name", nullable = false, length = Integer.MAX_VALUE)
    private String itemName;

    @Column(name = "item_description", length = Integer.MAX_VALUE)
    private String itemDescription;

    @ManyToMany
    private Set<Profile> profiles = new LinkedHashSet<>();

    @OneToMany(mappedBy = "item")
    private Set<Photo> photos = new LinkedHashSet<>();

    @OneToMany(mappedBy = "item")
    private Set<ShopSellsItem> shopSellsItems = new LinkedHashSet<>();


}