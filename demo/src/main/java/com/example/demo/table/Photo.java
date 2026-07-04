package com.example.demo.table;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "photo")
public class Photo {
    @Id
    @Column(name = "photo_id", nullable = false, length = Integer.MAX_VALUE)
    private String photoId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private Item item;

    @Column(name = "photo_url", nullable = false, length = Integer.MAX_VALUE)
    private String photoUrl;


}