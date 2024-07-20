package hanu.edu.application.controller.shopping_cart;

import hanu.edu.application.service.shopping_cart.ItemResourceShoppingCartService;
import hanu.edu.application.share.Response;
import hanu.edu.application.share.ResponseBuilder;
import hanu.edu.domain.model.shopping_cart.Item;
import hanu.edu.domain.model.shopping_cart.ShoppingCart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ItemResourceShoppingCartController {
    @Autowired
    private ItemResourceShoppingCartService itemResourceShoppingCartService;

    @PostMapping("/cart/{customerId}")
    public ResponseEntity<Response> addToShoppingCart(@RequestBody Item item, @PathVariable long customerId) {
        itemResourceShoppingCartService.addToShoppingCart(item, customerId);
        return ResponseBuilder.get201ResponseWithoutData("Product added to cart successfully!");
    }

    @GetMapping("/cart/{customerId}")
    public ResponseEntity<Response> getItems(@PathVariable long customerId) {
        return ResponseBuilder.get200ResponseWithData("Cart items gotten successfully!", itemResourceShoppingCartService.getItems(customerId));
    }

    @PutMapping("/cart/{customerId}")
    public ResponseEntity<Response> updateCart(@PathVariable long customerId, @RequestBody List<Item> cartItems) {
        itemResourceShoppingCartService.updateShoppingCart(new ShoppingCart(customerId, cartItems));
        return ResponseBuilder.get200ResponseWithoutData("Cart items updated successfully!");
    }

    @DeleteMapping("/cart/{customerId}/{productId}")
    public ResponseEntity<Response> deleteItem(@PathVariable long customerId, @PathVariable long productId) {
        itemResourceShoppingCartService.deleteItem(productId, customerId);
        return ResponseBuilder.get204Response("Item deleted successfully!");
    }

//    @PutMapping("/cart/{customerId}/{productId}/{quantity}")
//    public ResponseEntity<Response> updateItem(@PathVariable long customerId, @PathVariable long productId, @PathVariable long quantity) {
//        itemResourceShoppingCartService.updateItem(customerId, productId, quantity);
//        return ResponseBuilder.get200ResponseWithoutData("Item quantity updated successfully!");
//    }

//    @GetMapping("/cart/count/{customerId}")
//    public int countItem(@PathVariable long customerId) {
//        return itemResourceShoppingCartService.countItems(customerId);
//    }

    @DeleteMapping("/cart/{customerId}")
    public ResponseEntity<Response> deleteAllItem(@PathVariable long customerId) {
        itemResourceShoppingCartService.deleteAllItems(customerId);
        return ResponseBuilder.get200ResponseWithoutData("Cart items deleted successfully!");
    }
}
