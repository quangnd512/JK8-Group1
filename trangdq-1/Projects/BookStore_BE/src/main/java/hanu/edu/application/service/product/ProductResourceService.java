package hanu.edu.application.service.product;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import hanu.edu.domain.i_repository.product.ProductRepository;
import hanu.edu.domain.model.product.Product;
import hanu.edu.infrastructure.security.exception.BaseException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

//CRUD methods
@Service
@Slf4j
public class ProductResourceService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private Cloudinary cloudinary;

//    @Autowired
//    private AmazonS3 s3Client;
//
//    @Value("${amazon.s3.default-bucket}")
//    private String bucketName;

    public Product create(Product product) {
        Product productFromDB = productRepository.getByName(product.getName());
        if (productFromDB != null) {
            throw new BaseException("500", "Duplicate product's name!");
        }
        return productRepository.save(product);
    }

    public void update(Product product) {
        productRepository.save(product);
    }

    public Product getById(long id) {
        return productRepository.getById(id);
    }

    public void deleteById(long id) {
        productRepository.deleteById(id);
    }

    public Page<Product> getAllByPage(int page) {
        return productRepository.getAllProductsByPage(page, 20);
    }

    public Page<Product> getAllByCategory(int page, String category) {
        return productRepository.getProductByCategory(page, 20, category);
    }

    public Page<Product> getAllByPriceRange(int page, int from, int to) {
        return productRepository.getAllProductsByPriceRange(page, 20, from, to);
    }

    public void uploadImages(long productId, List<MultipartFile> productImages) {
        Product product = productRepository.getById(productId);
        List<String> images = product.getImages();
        if (images != null && !images.isEmpty()) {
            images.addAll(uploadImageToCloudinary(productImages));
        } else {
            images = uploadImageToCloudinary(productImages);
        }
        product.setImages(images);
        productRepository.save(product);
    }

    private List<String> uploadImageToCloudinary(List<MultipartFile> productImages) {
        List<String> imageUrls = new ArrayList<>();
        for (MultipartFile imageFile : productImages) {
            try {
                String fileName = imageFile.getOriginalFilename();
                String timestamp = String.valueOf(System.currentTimeMillis()); // Get current timestamp
                String publicId = fileName + "_" + timestamp;
                Map uploadResult = cloudinary.uploader().upload(imageFile.getBytes(), ObjectUtils.asMap("public_id", publicId));
                String secureUrl = (String) uploadResult.get("secure_url");
                imageUrls.add(secureUrl);
            } catch (IOException e) {
                log.error("Failed to upload image: " + imageFile.getOriginalFilename());
                return new ArrayList<>();
            }
        }
        return imageUrls;
    }

//    private List<String> uploadImagesToS3(List<MultipartFile> productImages) {
//        List<String> imagesUrls = new ArrayList<>();
//        for (MultipartFile multipartFile : productImages) {
//            String key = UUID.randomUUID().toString() + "-" + multipartFile.getOriginalFilename();
//            ObjectMetadata objectMetadata = new ObjectMetadata();
//            objectMetadata.setContentType(multipartFile.getContentType());
//            objectMetadata.setContentLength(multipartFile.getSize());
//            try {
//                // try to upload image
//                s3Client.putObject(new PutObjectRequest(bucketName, key, multipartFile.getInputStream(), objectMetadata)
//                        .withCannedAcl(CannedAccessControlList.PublicRead));
//                // image uploaded
//                String imageUrl = s3Client.getUrl(bucketName, key).toString();
//                imagesUrls.add(imageUrl);
//            } catch (Exception e) {
//                e.printStackTrace();
//            }
//        }
//        return imagesUrls;
//    }
}
