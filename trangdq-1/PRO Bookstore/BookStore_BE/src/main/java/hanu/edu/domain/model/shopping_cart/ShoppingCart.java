package hanu.edu.domain.model.shopping_cart;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ShoppingCart {
    @NotNull
    private long userId;
    @Setter
    private List<Item> items;
}
