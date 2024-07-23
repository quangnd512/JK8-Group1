package hanu.edu.application.service.product;

import hanu.edu.domain.i_repository.product.ProductRepository;
import hanu.edu.domain.model.product.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public class ProductPagingAndSortingService {
    @Autowired
    private ProductRepository productRepository;

    public Page<Product> getAllProductsByPage(int index, int size) {
        return productRepository.getAllProductsByPage(index, size);
    }

    public Page<Product> searchProductsByName(int index, int size, String name) {
        return productRepository.searchProductsByName(index, size, name);
    }

    public Page<Product> sortProductsBy(int index, int size, String direction, String... properties) {
        return productRepository.sortProductsBy(index, size, direction, properties);
    }

}
