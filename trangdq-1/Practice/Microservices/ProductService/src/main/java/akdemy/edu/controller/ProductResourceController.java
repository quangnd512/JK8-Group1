package akdemy.edu.controller;

import akdemy.edu.dto.ProductDTO;
import akdemy.edu.model.Product;
import akdemy.edu.service.ProductResourceService;
import akdemy.edu.share.Response;
import akdemy.edu.share.ResponseBuilder;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;

@RefreshScope
@RestController
@RequestMapping("/product-service")
@Slf4j
public class ProductResourceController {
    @Value("${server.port}")
    private String port;

    @Autowired
    private ProductResourceService productResourceService;

    // TODO: WebClient.creat()
//    private final WebClient webClient = WebClient.create();
    @Autowired
    private WebClient.Builder webClientBuilder;

//    @Autowired
//    private RestTemplate restTemplate;

//    @Autowired
//    private UserClient userClient;

//    @Autowired
//    private EurekaClient eurekaClient;

    @PostMapping(value = "/admin/product")
    public ResponseEntity<Response> create(@RequestBody ProductDTO productDTO, @RequestHeader("Authorization") String authorizationHeader) throws JsonProcessingException {
        // TODO: get & set headers
//        String token = authorizationHeader.substring(7);
//        HttpHeaders headers = new HttpHeaders();
//        headers.setBearerAuth(token);
//        headers.setContentType(MediaType.APPLICATION_JSON);

        // TODO: set request body
//        Map<String, Object> requestBody = new HashMap<>();
//        requestBody.put("username", "moon_halo");
//        requestBody.put("email", "moon_halo@gmail.com");
//        requestBody.put("password", "ASDFGHJK");
//        ObjectMapper objectMapper = new ObjectMapper();
//        String jsonRequestBody = objectMapper.writeValueAsString(requestBody);

        // TODO: RestTemplate exchange
        // can be used instead of other getFor, postFor...
//        HttpEntity<String> entity = new HttpEntity<>(jsonRequestBody, headers);
//        return restTemplate.exchange(
//                "http://localhost:8001/register",
//                HttpMethod.POST, // Use POST for request body
//                entity,
//                Response.class
//        );

        // TODO: RestTemplate GET (getForEntity, getForObject)
//        ResponseEntity<String> response = restTemplate.getForEntity( // getForObject
//                "http://localhost:8001/validate-token/" + token,
////                HttpMethod.GET,
////                entity,
//                String.class // Response.class
//        );
//        ObjectMapper mapper = new ObjectMapper();
//        JsonNode jsonRootNode = mapper.readTree(response.getBody());
//        JsonNode message = jsonRootNode.at("/message"); // get("message")
//        return message.asText();

        // TODO: query param
//        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl("http://localhost:8001/register");
//                .queryParam("username", "Hannah")
//                .queryParam("password", "ASDFGHJK")
//                .queryParam("email", "hannah@gmail.com");

        return ResponseBuilder.get201ResponseWithData("Product added successfully!",
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
    public ResponseEntity<Response> update(@PathVariable long id, @Valid @RequestBody ProductDTO productDTO, @RequestHeader("Authorization") String authorizationHeader) throws JsonProcessingException {
        // TODO: RestTemplate PUT (exchange)
//        String token = authorizationHeader.substring(7);
//        HttpHeaders headers = new HttpHeaders();
//        headers.setBearerAuth(token);
//        headers.setContentType(MediaType.APPLICATION_JSON);
//        Map<String, Object> requestBody = new HashMap<>();
//        requestBody.put("username", "annette");
//        requestBody.put("email", "annette@gmail.com");
//        requestBody.put("password", "");
//        requestBody.put("address", "Hanoi");
//        requestBody.put("avatar", "");
//        requestBody.put("name", "Annette");
//        requestBody.put("phone", "0123456789");
//        requestBody.put("age", 20);
//        requestBody.put("role","ROLE_CUSTOMER");
//        ObjectMapper objectMapper = new ObjectMapper();
//        String jsonRequestBody = objectMapper.writeValueAsString(requestBody);
//        HttpEntity<String> entity = new HttpEntity<>(jsonRequestBody, headers);
//        return restTemplate.exchange(
//                "http://localhost:8001/admin/user/4",
//                HttpMethod.PUT, // Use POST for request body
//                entity,
//                Response.class
//        );
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
        return ResponseBuilder.get201ResponseWithoutData("Product information updated!");
    }

    @PutMapping(value = "/admin/product/image-upload/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Response> uploadImages(@PathVariable long id, @RequestParam("images") List<MultipartFile> productImages) {
        productResourceService.uploadImages(id, productImages);
        return ResponseBuilder.get201ResponseWithoutData("Upload product's image successfully!");
    }

    @DeleteMapping("/admin/product/{id}")
    public ResponseEntity<Response> deleteById(@PathVariable long id) {
        productResourceService.deleteById(id);
        return ResponseBuilder.get204Response("Product deleted successfully!");
    }


    // not used
    @GetMapping("/admin/products/{page}")
    public ResponseEntity<Response> getAll(@PathVariable int page, @RequestHeader("Authorization") String authorizationHeader) {
        // TODO: Reactive programming, Flux just
//        List<Product> products = productResourceService.getAllByPage(page).stream().toList();
//        List<Product> list1 = products.subList(0, 2);
//        List<Product> list2 = products.subList(3, 4);
//        Flux.just(list1, list2).log().subscribe(new Subscriber<List<Product>>() {
//            private Subscription s;
//            int count;
//            @Override
//            public void onSubscribe(Subscription subscription) {
//                subscription.request(1);
//                this.s = subscription;
//            }
//
//            @Override
//            public void onNext(List<Product> products) {
//                count++;
//                if (count == 1) {
//                    count = 0;
//                    s.request(1);
//                }
//            }
//
//            @Override
//            public void onError(Throwable throwable) {
//                //
//            }
//
//            @Override
//            public void onComplete() {
//                //
//            }
//        });

        // TODO: Flux generate
        // ~ zip
//        Flux<String> products = Flux.<String>generate(sink -> sink.next("Test\n")).take(10).delayElements(Duration.ofSeconds(2)); // Publisher<String>

        // TODO: Mono from Flux.count()
//        return products.count(); // Mono<Long>

        // TODO: Flux fromStream
//        return Flux.fromStream(productResourceService.getAllByPage(page).stream().toList().stream()).flatMap(product -> {
//            Mono<Response> user = webClient
//                .get()
//                .uri("http://localhost:8001/admin/user/{userId}", 1)
//                .header("Authorization", authorizationHeader)
//                .retrieve().bodyToMono(Response.class);
//            return Mono.zip(Mono.just(product),user).map(this::buildOrder);
//        });

        // TODO: Flux parallel
//        Flux.range(1,4)
//                .parallel()
//                .runOn(Schedulers.parallel())
//                .log().subscribe(this::processMethods);

        return ResponseBuilder.get200ResponseWithData("Fetched all products successfully!", productResourceService.getAllByPage(page));
    }

//    private void processMethods(int i) {
//        System.out.println("Processing: " + i);
//        try {
//            Thread.sleep(2000);
//        } catch (InterruptedException e) {
//            e.printStackTrace();
//        }
//    }

    @GetMapping("/product/category/{category}/{page}")
    public ResponseEntity<Response> getByCategory(@PathVariable String category, @PathVariable int page) {
        return ResponseBuilder.get200ResponseWithData("Filtered product by category successfully!", productResourceService.getAllByCategory(page, category));
    }

    @GetMapping("/product/price/{from}-to-{to}/{page}")
    public ResponseEntity<Response> getByPriceRange(@PathVariable int from, @PathVariable int to, @PathVariable int page) {
        return ResponseBuilder.get200ResponseWithData("Filtered product by category successfully!", productResourceService.getAllByPriceRange(page, from, to));
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<Response> getById(@PathVariable long id, @RequestHeader("Authorization") String authorizationHeader) {
        // TODO: WebClient block
        // transforming asynchronous operations into synchronous ones
//        Product product = Mono.just(productResourceService.getById(id)).block();

        // TODO: WebClient GET/PUT/POST/DELETE
//        Mono<Response> user = webClient
//                .get() // put(), post(), delete()
//                .uri("http://localhost:8001/admin/user/{userId}", id)
//                .header("Authorization", authorizationHeader)
//                .retrieve().bodyToMono(Response.class);

        // TODO: Mono zip
//        return Mono.zip(Mono.just(product),user).map(this::buildOrder);

        // TODO: EurekaClient lib getApplications()
//        System.out.println("************* App List: " + eurekaClient.getApplications().getRegisteredApplications());

        return ResponseBuilder.get200ResponseWithData("Got product successfully!", productResourceService.getById(id));
    }


    @GetMapping("/user-port")
    public Mono<Response> geUserPort() {
        // TODO: FeignClient call
//        return userClient.getPort();

        // TODO: @RefreshScope
//        return port;

        // TODO: WebClient x UserService
        return webClientBuilder.build().get().uri("http://localhost:8000/user-service/port").retrieve().bodyToMono(Response.class);
    }

//    @PostMapping("/user-register")
//    public ResponseEntity<BaseResponseDTO> registerUser(@Valid @RequestBody NewUserDTO newUserDTO) {
//        return userClient.register(new NewUserDTO(newUserDTO.getUsername(), newUserDTO.getEmail(), newUserDTO.getPassword()));
//    }


//    private String buildOrder(Tuple2<Product,Response> tuple) {
//        ObjectMapper mapper = new ObjectMapper();
//        try {
//            String jsonString = mapper.writeValueAsString(tuple.getT2().getData());
//            JsonNode jsonRootNode = mapper.readTree(jsonString);
//            String name = jsonRootNode.get("name").asText();
//            return tuple.getT1().getName() + " is bought by " + name + ".\n";
//        } catch (IOException e) {
//            return "";
//        }
//    }
}
