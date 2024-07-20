package hanu.edu.domain.entity;

import hanu.edu.domain.model.product.Product;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Entity(name = "product")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(unique = true)
    private String name;
    private double price;
    @Column(columnDefinition = "TEXT")
    private String description;
    private long inStock;
    @Column(columnDefinition = "TEXT")
    private String images;
    private String category;
    private int discount;


    public static ProductEntity toEntity(Product product) {
        return ProductEntity.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .description(product.getDescription())
                .inStock(product.getInStock())
                .images(product.getImages() == null || product.getImages().isEmpty() ? null : imagesToString(product.getImages()))
                .category(product.getCategory())
                .discount(product.getDiscount())
                .build();
    }

    private static String imagesToString(List<String> images) {
        StringBuilder imagesToString = new StringBuilder();
        for (String image : images) {
            imagesToString.append(image).append("\n");
        }
        return imagesToString.toString();
    }

    public Product toProduct() {
        List<String> imageList = new ArrayList<>();
        if (images != null) {
            String[] imageArray = images.split("\n");
            Collections.addAll(imageList, imageArray);
        }
        return new Product(id, name, price, description, inStock, imageList, category, discount);
    }
}
