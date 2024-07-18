package hanu.edu.domain.entity;

import hanu.edu.domain.model.user.Admin;
import jakarta.persistence.Entity;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity(name = "admin")
@NoArgsConstructor
@SuperBuilder
public class AdminEntity extends UserEntity {
    public static AdminEntity toEntity(Admin admin) {
        return AdminEntity.builder()
                .id(admin.getId())
                .username(admin.getUsername())
                .email(admin.getEmail())
                .password(admin.getPassword())
                .name(admin.getName())
                .age(admin.getAge())
                .address(admin.getAddress())
                .avatar(admin.getAvatar())
                .phone(admin.getPhone())
                .enabled(admin.isEnabled())
                .role(admin.getRole())
                .build();
    }

    public Admin toAdmin() {
        return new Admin(getId(), getUsername(), getEmail(), getPassword(), getName(), getAddress(), getPhone(), getAge(), getAvatar());
    }
}
