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
public class CartId implements Serializable {
    private static final long serialVersionUID = 6862495980552293877L;
    @Column(name = "cart_id", nullable = false)
    private Integer cartId;

    @Column(name = "profile_id", nullable = false, length = Integer.MAX_VALUE)
    private String profileId;


}