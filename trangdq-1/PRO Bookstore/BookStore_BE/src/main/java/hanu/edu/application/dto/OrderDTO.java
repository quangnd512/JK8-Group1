package hanu.edu.application.dto;

import hanu.edu.domain.model.shopping_cart.Item;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class OrderDTO {
    @NotEmpty
    private List<Item> items;
    private long voucherId;
    private String paymentMethod;
    private String message;
    private String addressToReceive;
    private String userName;
    private String userPhone;
}
