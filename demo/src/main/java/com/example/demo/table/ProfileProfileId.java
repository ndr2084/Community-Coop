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
public class ProfileProfileId implements Serializable {
    private static final long serialVersionUID = -6789017491291214181L;
    @Column(name = "subject1", nullable = false, length = Integer.MAX_VALUE)
    private String subject1;

    @Column(name = "subject2", nullable = false, length = Integer.MAX_VALUE)
    private String subject2;


}