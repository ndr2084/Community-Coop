package com.example.demo.table;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@EqualsAndHashCode
@Embeddable
public class ShopItemId implements Serializable {
    private static final long serialVersionUID = -6019421563972009853L;
    @Column(name = "item_id", nullable = false, length = Integer.MAX_VALUE)
    private String itemId;

    @Column(name = "shop_id", nullable = false, length = Integer.MAX_VALUE)
    private String shopId;


}