package com.example.demo.table;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "shop")
public class Shop {
    @Id
    @Column(name = "shop_id", nullable = false, length = Integer.MAX_VALUE)
    private String shopId;

    //TODO [Reverse Engineering] generate columns from DB
}