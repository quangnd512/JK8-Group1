package hanu.edu.application.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ProductDTO {
    @NotEmpty(message = "Name cannot be empty.")
    private String name;
    @Min(value = 0, message = "Price cannot not be less than 0.")
    private double price;
    private String description;
    @Min(value = 0, message = "In-stock products cannot be less than 0.")
    private long inStock;
    private List<String> images;
    private String category;
    @Min(value = 0, message = "Discount cannot be less than 0")
    private int discount;
}
