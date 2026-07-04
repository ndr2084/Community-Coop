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
public class ProfileShopId implements Serializable {
    private static final long serialVersionUID = -2101187876737401139L;
    @Column(name = "subject", nullable = false, length = Integer.MAX_VALUE)
    private String subject;

    @Column(name = "shop_id", nullable = false, length = Integer.MAX_VALUE)
    private String shopId;


}