package hanu.edu.domain.i_repository.shopping_cart;

import hanu.edu.domain.model.shopping_cart.ShoppingCart;

public interface ShoppingCartRepository {
    public void save(ShoppingCart shoppingCart);

    public void deleteById(long id);

    public ShoppingCart getByUserId(long customerId);
}
