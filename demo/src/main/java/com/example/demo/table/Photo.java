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
    @Column(name = "photo_id", nullable = false)
    private Integer id;

    @Column(name = "photo_name", length = Integer.MAX_VALUE)
    private String photoName;

    @Column(name = "photo_url", length = Integer.MAX_VALUE)
    private String photoUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private Item item;


}