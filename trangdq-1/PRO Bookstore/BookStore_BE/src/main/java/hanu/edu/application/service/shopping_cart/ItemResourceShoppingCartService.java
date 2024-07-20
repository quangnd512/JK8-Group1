package hanu.edu.application.service.shopping_cart;

import hanu.edu.domain.i_repository.product.ProductRepository;
import hanu.edu.domain.i_repository.shopping_cart.ShoppingCartRepository;
import hanu.edu.domain.model.product.Product;
import hanu.edu.domain.model.shopping_cart.Item;
import hanu.edu.domain.model.shopping_cart.ShoppingCart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ItemResourceShoppingCartService {

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @Autowired
    private ProductRepository productRepository;

    public void addShoppingCart(ShoppingCart shoppingCart) {
        shoppingCartRepository.save(shoppingCart);
    }

    public void updateShoppingCart(ShoppingCart shoppingCart) {
        shoppingCartRepository.save(shoppingCart);
    }

    public void deleteShoppingCart(long id) {
        shoppingCartRepository.deleteById(id);
    }

    public void addToShoppingCart(Item item, long customerId) {
        ShoppingCart cart = shoppingCartRepository.getByUserId(customerId);
        Product product = productRepository.getById(item.getProductId());
        List<Item> items = cart.getItems();
        boolean inCart = false;
        if (items != null) {
            for (Item i : items) {
                if (i.getProductId() == item.getProductId()) {
                    if (item.getQuantity() + i.getQuantity() <= product.getInStock())
                        i.setQuantity(item.getQuantity() + i.getQuantity());
                    inCart = true;
                    break;
                }
            }
            if (!inCart) {
                items.add(item);
            }
        } else {
            items = new ArrayList<>();
            items.add(item);
        }
        cart.setItems(items);
        shoppingCartRepository.save(cart);
    }

    public List<OutputCartItem> getItems(long customerId) {
        ShoppingCart cart = shoppingCartRepository.getByUserId(customerId);
        List<OutputCartItem> outputCartItems = new ArrayList<>();
        if (cart.getItems() != null) {
            for (Item i : cart.getItems()) {
                Product product = productRepository.getById(i.getProductId());
                if (product != null) {
                    OutputCartItem outputCartItem = OutputCartItem.builder()
                            .productId(product.getId())
                            .description(product.getDescription())
                            .name(product.getName())
                            .price(product.getPrice())
                            .inStock(product.getInStock())
                            .images(product.getImages())
                            .category(product.getCategory())
                            .quantity(i.getQuantity())
                            .discount(product.getDiscount())
                            .build();
                    outputCartItems.add(outputCartItem);
                }
            }
        }
        return outputCartItems;
    }

    public void deleteItem(long productId, long customerId) {
        ShoppingCart shoppingCart = shoppingCartRepository.getByUserId(customerId);
        List<Item> items = shoppingCart.getItems();
        if (items != null) {
            for (Item i : items) {
                if (i.getProductId() == productId) {
                    items.remove(i);
                    shoppingCart.setItems(items);
                    shoppingCartRepository.save(shoppingCart);
                    break;
                }
            }
        }
    }

//    public void updateItem(long customerId, long productId, long quantity) {
//        ShoppingCart cart = shoppingCartRepository.getByUserId(customerId);
//        List<Item> items = cart.getItems();
//        if (items != null) {
//            for (Item i : items) {
//                if (i.getProductId() == productId) {
//                    i.setQuantity(quantity);
//                    cart.setItems(items);
//                    shoppingCartRepository.save(cart);
//                    break;
//                }
//            }
//        }
//    }

//    public int countItems(long customerId) {
//        ShoppingCart cart = shoppingCartRepository.getByUserId(customerId);
//        return cart.getItems() == null ? 0 : cart.getItems().size();
//    }

    public void deleteAllItems(long customerId) {
        ShoppingCart cart = shoppingCartRepository.getByUserId(customerId);
        cart.setItems(null);
        shoppingCartRepository.save(cart);
    }

}




