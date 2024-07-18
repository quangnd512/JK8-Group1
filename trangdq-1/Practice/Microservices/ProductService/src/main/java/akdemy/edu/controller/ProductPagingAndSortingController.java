package akdemy.edu.controller;

import akdemy.edu.service.ProductPagingAndSortingService;
import akdemy.edu.share.Response;
import akdemy.edu.share.ResponseBuilder;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/product-service")
public class ProductPagingAndSortingController {
    @Autowired
    private ProductPagingAndSortingService productPagingAndSortingService;

    @GetMapping({"/{pageNo}", "/"})
    public ResponseEntity<Response> getProductsBy(@PathVariable(name = "pageNo") Optional<Integer> pageNo,
                                                  @PathParam("direction") String direction,
                                                  @PathParam("price") boolean price,
                                                  @PathParam("name") boolean name,
                                                  @PathParam("category") boolean category,
                                                  @PathParam("inStock") boolean inStock) {
        int page = pageNo.orElse(0);
        if (direction == null || direction.isEmpty()) direction = "asc";
        if (price) {
            return ResponseBuilder.get200ResponseWithData("Fetch products successfully!", productPagingAndSortingService.sortProductsBy(page, 20, direction, "price"));
        } else if (name) {
            return ResponseBuilder.get200ResponseWithData("Fetch products successfully!", productPagingAndSortingService.sortProductsBy(page, 20, direction, "name"));
        } else if (category) {
            return ResponseBuilder.get200ResponseWithData("Fetch products successfully!", productPagingAndSortingService.sortProductsBy(page, 20, direction, "category"));
        } else if (inStock) {
            return ResponseBuilder.get200ResponseWithData("Fetch products successfully!", productPagingAndSortingService.sortProductsBy(page, 20, direction, "inStock"));
        } else {
            return ResponseBuilder.get200ResponseWithData("Fetch products successfully!", productPagingAndSortingService.getAllProductsByPage(page, 20));
        }
    }

    @GetMapping({"/search", "/search/{pageNo}"})
    public ResponseEntity<Response> getProductsByName(@PathVariable(name = "pageNo") Optional<Integer> pageNo, @PathParam("name") String name) {
        int page = pageNo.orElse(0);
        if (name != null && !name.isEmpty()) {
            return ResponseBuilder.get200ResponseWithData("Search products successfully!", productPagingAndSortingService.searchProductsByName(page, 20, name));
        } else {
            return ResponseBuilder.get200ResponseWithData("Search products successfully!", productPagingAndSortingService.getAllProductsByPage(page, 20));
        }
    }
}
