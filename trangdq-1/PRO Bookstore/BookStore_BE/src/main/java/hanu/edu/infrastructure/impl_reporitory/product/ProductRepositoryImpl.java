package hanu.edu.infrastructure.impl_reporitory.product;

import hanu.edu.domain.entity.ProductEntity;
import hanu.edu.domain.i_repository.product.ProductJPARepository;
import hanu.edu.domain.i_repository.product.ProductRepository;
import hanu.edu.domain.model.product.Product;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

@Repository
@AllArgsConstructor
public class ProductRepositoryImpl implements ProductRepository {

    private ProductJPARepository productJPARepository;

    @Override
    public Product getById(long id) {
        return productJPARepository.findById(id).map(ProductEntity::toProduct).orElse(null);
    }

    @Override
    public Product save(Product product) {
        return productJPARepository.save(ProductEntity.toEntity(product)).toProduct();
    }

    @Override
    public Product getByName(String name) {
        ProductEntity productEntity = productJPARepository.findByName(name);
        return productEntity != null ? productEntity.toProduct() : null;
    }

    @Override
    public void deleteById(long id) {
        productJPARepository.deleteById(id);
    }

    @Override
    public Page<Product> getAllProductsByPage(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        return productJPARepository.findAll(pageRequest).map(ProductEntity::toProduct);
    }

    @Override
    public Page<Product> getAllProductsByPriceRange(int page, int size, int from, int to) {
        Pageable pageRequest = PageRequest.of(page, size);
        return productJPARepository.findAllByPriceBetween(pageRequest, from, to).map(ProductEntity::toProduct);
    }

    @Override
    public Page<Product> searchProductsByName(int page, int size, String name) {
        Pageable pageRequest = PageRequest.of(page, size);
        return productJPARepository.findAllByNameContaining(name, pageRequest).map(ProductEntity::toProduct);
    }

    @Override
    public Page<Product> sortProductsBy(int page, int size, String direction, String... properties) {
        PageRequest pageRequest;
        if (direction.equals("asc")) {
            pageRequest = PageRequest.of(page, size, Sort.Direction.ASC, properties);
        } else if (direction.equals("desc")) {
            pageRequest = PageRequest.of(page, size, Sort.Direction.DESC, properties);
        } else {
            pageRequest = PageRequest.of(page, size, Sort.DEFAULT_DIRECTION, properties);
        }
        return productJPARepository.findAll(pageRequest).map(ProductEntity::toProduct);
    }

    @Override
    public Page<Product> getProductByCategory(int page, int size, String category) {
        Pageable pageRequest = PageRequest.of(page, size);
        return productJPARepository.findAllByCategoryContaining(category, pageRequest).map(ProductEntity::toProduct);
    }
}
