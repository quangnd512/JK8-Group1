package akdemy.edu.filters;

import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import reactor.core.publisher.Mono;

@Slf4j
//@Configuration
public class GatewayConfig {
//    @Bean
//    public RouteLocator buildRouteLocator(RouteLocatorBuilder builder) {
//        return builder.routes()
//                .route("Product-Service",r -> r.path("/product-service/**").uri("lb://Product-Service"))
//                .route("User-Service",r -> r.path("/user-service/**")
//                        .filters(f ->
////                            f.rewritePath("/user-service/(?<remaining>.*)", "/${remaining}").setStatus(401))
//                            f.filter(new RequestTimeFilter()))
//                        .uri("lb://User-Service")
//                )//.uri("http://User-Service:8001"))
//                .build();
//
//    }
//
    @Bean
    public GlobalFilter customGlobalFilter() {
        return (exchange, chain) -> {
            // Log request details before processing
            ServerHttpRequest request = exchange.getRequest();
            String method = request.getMethod().name();
            String path = request.getURI().getPath();
            log.info("Incoming request: {} {}", method, path);
            // Continue processing through the filter chain
            return chain.filter(exchange)
                    .then(Mono.fromRunnable(() -> {
                        // Log response details after processing
                        ServerHttpResponse response = exchange.getResponse();
                        int statusCode = response.getStatusCode().value();
                        log.info("Outgoing response: {} {}", statusCode, path);
                    }));
        };
    }
}