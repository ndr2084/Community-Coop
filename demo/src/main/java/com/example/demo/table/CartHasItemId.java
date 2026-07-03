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
public class CartHasItemId implements Serializable {
    private static final long serialVersionUID = 4329201871344594431L;
    @Column(name = "item_id", nullable = false, length = Integer.MAX_VALUE)
    private String itemId;

    @Column(name = "profile_id", nullable = false, length = Integer.MAX_VALUE)
    private String profileId;


}