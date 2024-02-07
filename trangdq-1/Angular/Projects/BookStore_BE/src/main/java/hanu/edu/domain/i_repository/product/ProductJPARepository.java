package hanu.edu.domain.i_repository.product;

import hanu.edu.domain.entity.ProductEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductJPARepository extends JpaRepository<ProductEntity, Long> {
    Page<ProductEntity> findAllByNameContaining(String name, Pageable pageable);

    ProductEntity findByName(String name);

    Page<ProductEntity> findAllByCategoryContaining(String category, Pageable pageRequest);
}
