package akdemy.edu.filters;

import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

@Component
@Slf4j
public class RequestTimeFilter extends AbstractGatewayFilterFactory<RequestTimeFilter.RequestTimeFilterConfig> {
    public RequestTimeFilter() {
        super(RequestTimeFilterConfig.class);
    }

    @Override
    public GatewayFilter apply(RequestTimeFilterConfig config) {
        return (exchange, chain) -> {
            long startTime = System.currentTimeMillis();
            return chain.filter(exchange)     // Proceed with the request
                    .then(Mono.fromRunnable(() -> {
                        long duration = System.currentTimeMillis() - startTime;
                        ServerHttpRequest request = exchange.getRequest();
                        String path = request.getURI().getPath();
                        String method = request.getMethod().name();
                        log.info("Request to {} {} took {}ms", method, path, duration);
                    }));
        };
    }

    @lombok.Data
    public static class RequestTimeFilterConfig {
        //
    }
}
