package hanu.edu.domain.i_repository.shopping_cart;

import hanu.edu.domain.entity.ShoppingCartEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShoppingCartJPARepository extends JpaRepository<ShoppingCartEntity, Long> {
    ShoppingCartEntity findByUserId(long customerId);
}
