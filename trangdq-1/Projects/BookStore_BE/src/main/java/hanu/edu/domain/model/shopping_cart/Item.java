package hanu.edu.domain.model.shopping_cart;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Item {
    @NotNull
    private long productId;
    @Min(1)
    @Setter
    private long quantity;
}
