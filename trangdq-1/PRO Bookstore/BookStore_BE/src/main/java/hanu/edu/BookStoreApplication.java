package hanu.edu;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BookStoreApplication {

    public static void main(String[] args) {
        SpringApplication.run(BookStoreApplication.class, args);
    }

//    @Bean
//    public WebMvcConfigurer corsConfigurer() {
//        return new WebMvcConfigurer() {
//            @Override
//            public void addCorsMappings(@NotNull CorsRegistry registry) {
//                registry.addMapping("/**")
//                        .allowedOrigins("http://localhost:3000")
//                        .allowedMethods(CorsConfiguration.ALL)
//                        .allowedHeaders(CorsConfiguration.ALL)
//                        .exposedHeaders("Access-Control-Allow-Origin", "Access-Control-Allow-Credentials");
//            }
//        };
//    }
}
