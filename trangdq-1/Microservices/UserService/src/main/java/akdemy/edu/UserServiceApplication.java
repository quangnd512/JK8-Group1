package akdemy.edu;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import reactor.core.publisher.Hooks;

@SpringBootApplication
public class UserServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
        Hooks.enableAutomaticContextPropagation();
    }

//	@LoadBalanced
//	@Bean
//	public RestTemplate restTemplate() {
//		return new RestTemplate();
//	}

}
