package hanu.edu.infrastructure.impl_reporitory.shopping_cart;

import hanu.edu.domain.entity.ShoppingCartEntity;
import hanu.edu.domain.i_repository.shopping_cart.ShoppingCartJPARepository;
import hanu.edu.domain.i_repository.shopping_cart.ShoppingCartRepository;
import hanu.edu.domain.model.shopping_cart.ShoppingCart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ShoppingCartRepositoryImpl implements ShoppingCartRepository {
    @Autowired
    private ShoppingCartJPARepository shoppingCartJPARepository;

    @Override
    public void save(ShoppingCart shoppingCart) {
        shoppingCartJPARepository.save(ShoppingCartEntity.toEntity(shoppingCart));
    }

    @Override
    public void deleteById(long id) {
        shoppingCartJPARepository.deleteById(id);
    }

    @Override
    public ShoppingCart getByUserId(long customerId) {
        ShoppingCartEntity shoppingCartEntity = shoppingCartJPARepository.findByUserId(customerId);
        return shoppingCartEntity == null ? null : shoppingCartEntity.toShoppingCart();
    }
}
