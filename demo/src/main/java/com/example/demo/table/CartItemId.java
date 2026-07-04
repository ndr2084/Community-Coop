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
public class CartItemId implements Serializable {
    private static final long serialVersionUID = 8683403458040188015L;
    @Column(name = "item_id", nullable = false, length = Integer.MAX_VALUE)
    private String itemId;

    @Column(name = "cart_id", nullable = false, length = Integer.MAX_VALUE)
    private String cartId;


}