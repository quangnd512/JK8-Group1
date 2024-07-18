package hanu.edu.domain.i_repository.product;

import hanu.edu.domain.model.product.Product;
import org.springframework.data.domain.Page;

public interface ProductRepository {
    Page<Product> getAllProductsByPage(int page, int size);

    Page<Product> getAllProductsByPriceRange(int page, int size, int from, int to);

    Product getById(long id);

    Product save(Product productEntity);

    Product getByName(String name);

    void deleteById(long id);

    Page<Product> searchProductsByName(int page, int size, String name);

    Page<Product> sortProductsBy(int page, int size, String direction, String... properties);

    Page<Product> getProductByCategory(int page, int size, String category);
}
