package hanu.edu.application.service.shopping_cart;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class OutputCartItem {
    private long quantity;
    private long productId;
    private String name;
    private double price;
    private String description;
    private long inStock;
    private List<String> images;
    private String category;
    private int discount;
}
