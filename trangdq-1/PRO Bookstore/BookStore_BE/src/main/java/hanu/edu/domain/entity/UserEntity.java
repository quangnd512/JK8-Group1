package hanu.edu.domain.entity;

import hanu.edu.domain.model.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.NaturalId;

import static jakarta.persistence.DiscriminatorType.STRING;

@Entity(name = "user")
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Getter
@Setter
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "dtype", discriminatorType = STRING, length = 20)
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @NaturalId(mutable = true)
    private String username;
    @NaturalId(mutable = true)
    private String email;
    private String password;
    private boolean enabled;
    private String role;
    private String name;
    private int age;
    private String address;
    private String avatar;
    private String phone;
    @Column(name = "dtype", insertable = false, updatable = false)
    private String dtype;

    public static UserEntity toEntity(User user) {
        return UserEntity.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .password(user.getPassword())
                .enabled(user.isEnabled())
                .role(user.getRole())
                .name(user.getName())
                .age(user.getAge())
                .address(user.getAddress())
                .avatar(user.getAvatar())
                .phone(user.getPhone())
                .build();
    }

    public User toUser() {
        return new User(id, username, email, password, name, address, phone, age, avatar, enabled, role);
    }
}
