package hanu.edu.domain.entity;

import hanu.edu.domain.model.user.Customer;
import jakarta.persistence.Entity;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity(name = "customer")
@NoArgsConstructor
@SuperBuilder
public class CustomerEntity extends UserEntity {
    public static CustomerEntity toEntity(Customer customer) {
        return CustomerEntity.builder()
                .id(customer.getId())
                .username(customer.getUsername())
                .email(customer.getEmail())
                .password(customer.getPassword())
                .name(customer.getName())
                .age(customer.getAge())
                .address(customer.getAddress())
                .avatar(customer.getAvatar())
                .phone(customer.getPhone())
                .enabled(customer.isEnabled())
                .role(customer.getRole())
                .build();
    }


    public Customer toCustomer() {
        return new Customer(getId(), getUsername(), getEmail(), getPassword(), getName(), getAddress(), getPhone(), getAge(), getAvatar());
    }
}