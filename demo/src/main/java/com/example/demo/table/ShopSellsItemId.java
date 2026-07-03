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
public class ShopSellsItemId implements Serializable {
    private static final long serialVersionUID = -8811531354064208246L;
    @Column(name = "shop_id", nullable = false, length = Integer.MAX_VALUE)
    private String shopId;

    @Column(name = "item_id", nullable = false, length = Integer.MAX_VALUE)
    private String itemId;


}