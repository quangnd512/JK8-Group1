package hanu.edu.domain.entity;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import hanu.edu.domain.model.shopping_cart.Item;
import hanu.edu.domain.model.shopping_cart.ShoppingCart;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "shopping_cart")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ShoppingCartEntity {
    @Id
    private long userId;
    @Column(name = "items", columnDefinition = "TEXT")
    private String items;
    @OneToOne(cascade = CascadeType.REMOVE)
    @PrimaryKeyJoinColumn(name = "user_id")
    private UserEntity userEntity;

    public static ShoppingCartEntity toEntity(ShoppingCart shoppingCart) {
        try {
            return ShoppingCartEntity.builder()
                    .userId(shoppingCart.getUserId())
                    .items(shoppingCart.getItems() == null ? null :
                            new ObjectMapper().writeValueAsString(shoppingCart.getItems()))
                    .build();
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public ShoppingCart toShoppingCart() {
        try {
            if (items == null || items.isEmpty()) {
                return new ShoppingCart(userId, null);
            } else {
                return new ShoppingCart(userId, new ObjectMapper().readValue(items, new TypeReference<List<Item>>() {
                }));
            }
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
