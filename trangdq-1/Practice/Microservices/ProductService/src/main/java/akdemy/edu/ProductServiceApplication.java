package akdemy.edu;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import reactor.core.publisher.Hooks;

@SpringBootApplication
// TODO: FeignClient or Eureka enable
//@EnableFeignClients
//By having spring-cloud-starter-netflix-eureka-client on the classpath, your application automatically registers with the Eureka Server
public class ProductServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(ProductServiceApplication.class, args);
        Hooks.enableAutomaticContextPropagation();
    }

    // TODO: RestTemplate bean
//    @LoadBalanced
//    @Bean
//    public RestTemplate restTemplate() {
//        return new RestTemplate();
//    }
}
