package hanu.edu.application.controller.product;

import hanu.edu.application.dto.ProductDTO;
import hanu.edu.application.service.product.ProductResourceService;
import hanu.edu.application.share.Response;
import hanu.edu.application.share.ResponseCustomBuilder;
import hanu.edu.domain.model.product.Product;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@AllArgsConstructor
public class ProductResourceController {
    @Autowired
    private ProductResourceService productResourceService;

    @PostMapping(value = "/admin/product")
    public ResponseEntity<Response> create(@RequestBody ProductDTO productDTO) {
        return ResponseCustomBuilder.get201ResponseWithData("Product added successfully!",
                productResourceService.create(
                        new Product(
                                productDTO.getName(),
                                productDTO.getPrice(),
                                productDTO.getDescription(),
                                productDTO.getInStock(),
                                productDTO.getImages(),
                                productDTO.getCategory(),
                                productDTO.getDiscount())));
    }

    @PutMapping(value = "/admin/product/{id}")
    public ResponseEntity<Response> update(@PathVariable long id, @Valid @RequestBody ProductDTO productDTO) {
        productResourceService.update(
                new Product(
                        id,
                        productDTO.getName(),
                        productDTO.getPrice(),
                        productDTO.getDescription(),
                        productDTO.getInStock(),
                        productDTO.getImages(),
                        productDTO.getCategory(),
                        productDTO.getDiscount()));
        return ResponseCustomBuilder.get201ResponseWithoutData("Product information updated!");
    }

    @PutMapping(value = "/admin/product/image-upload/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Response> uploadImages(@PathVariable long id, @RequestParam("images") List<MultipartFile> productImages) {
        productResourceService.uploadImages(id, productImages);
        return ResponseCustomBuilder.get201ResponseWithoutData("Upload product's image successfully!");
    }

    @DeleteMapping("/admin/product/{id}")
    public ResponseEntity<Response> deleteById(@PathVariable long id) {
        productResourceService.deleteById(id);
        return ResponseCustomBuilder.get204Response("Product deleted successfully!");
    }


    @GetMapping("/admin/product/{page}")
    public ResponseEntity<Response> getAll(@PathVariable int page) {
        return ResponseCustomBuilder.get200ResponseWithData("Fetched all products successfully!", productResourceService.getAllByPage(page));
    }

    @GetMapping("/product/{category}/{page}")
    public ResponseEntity<?> getByCategory(@PathVariable String category, @PathVariable int page) {
        return new ResponseEntity<>(productResourceService.getAllByCategory(page, category), HttpStatus.OK);
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<Response> getById(@PathVariable long id) {
        return ResponseCustomBuilder.get200ResponseWithData("Get product successfully!", productResourceService.getById(id));
    }
}
