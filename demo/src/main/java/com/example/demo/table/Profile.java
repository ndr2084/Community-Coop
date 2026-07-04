package com.example.demo.table;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.proxy.HibernateProxy;

import java.util.Objects;

@Getter
@Setter
@Entity
@ToString
@Table(name = "profile")
public class Profile {
    @Id
    @Column(name = "subject", nullable = false, length = Integer.MAX_VALUE)
    private String subject;

    @NotBlank
    @Size(min=1, max=50)
    @Column(name = "first_name", nullable = false, length = Integer.MAX_VALUE)
    private String firstName;

    @NotBlank
    @Size(min=1, max=50)
    @Column(name = "last_name", nullable = false, length = Integer.MAX_VALUE)
    private String lastName;

    @NotBlank
    @Column(name = "authority", nullable = false, length = Integer.MAX_VALUE)
    private String authority;

    @Email
    @Column(name = "gmail", nullable = false, length = Integer.MAX_VALUE)
    private String gmail;
    @OneToOne(mappedBy = "profile")
    private Cart cart;

    public Profile(String subject) {
        this.subject = subject;
    }

    public Profile() {

    }

    public void setUser(String email, String authority) {
        this.gmail = email;
        this.authority = authority;
    }

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        Profile profile = (Profile) o;
        return getSubject() != null && Objects.equals(getSubject(), profile.getSubject());
    }

    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
    }
}