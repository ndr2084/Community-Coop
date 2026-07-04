package com.example.demo.table;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.jspecify.annotations.NonNull;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "cart")
public class Cart {
    @Id
    @Column(name = "cart_id", nullable = false, length = Integer.MAX_VALUE)
    private String cartId;

    @Column(name = "total_price", nullable = false)
    private Integer totalPrice;

    @Column(name = "cart_name", nullable = false, length = Integer.MAX_VALUE)
    private String cartName;
    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "cart_id", nullable = false)
    private Profile profile;
    @NonNull
    @OneToMany(mappedBy = "cart")
    private Set<CartItem> cartItems = new LinkedHashSet<>();


}