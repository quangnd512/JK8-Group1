package akdemy.edu.client;

import org.springframework.cloud.client.DefaultServiceInstance;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.loadbalancer.core.RandomLoadBalancer;
import org.springframework.cloud.loadbalancer.core.ReactorLoadBalancer;
import org.springframework.cloud.loadbalancer.core.ServiceInstanceListSupplier;
import org.springframework.cloud.loadbalancer.support.LoadBalancerClientFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.core.env.Environment;
import reactor.core.publisher.Flux;

import java.util.Arrays;
import java.util.List;

public class UserClientConfiguration {

    @Bean
    @Primary
    public ServiceInstanceListSupplier serviceInstanceListSupplier() {
        return new UserServiceInstanceListSuppler("User-Service");
    }

    @Bean
    public ReactorLoadBalancer<ServiceInstance> randomLoadBalancer(Environment environment, LoadBalancerClientFactory loadBalancerClientFactory) {
        String name = environment.getProperty(LoadBalancerClientFactory.PROPERTY_NAME);
        return new RandomLoadBalancer(loadBalancerClientFactory.getLazyProvider(name, ServiceInstanceListSupplier.class), name);
    }

    public class UserServiceInstanceListSuppler implements ServiceInstanceListSupplier {

        private String serviceId;

        public UserServiceInstanceListSuppler(String serviceId) {
            this.serviceId = serviceId;
        }

        @Override
        public String getServiceId() {
            return serviceId;
        }

        @Override
        public Flux<List<ServiceInstance>> get() {
            return Flux.just(Arrays
                    .asList(new DefaultServiceInstance(serviceId + "1", serviceId, "localhost", 8081, false),
                            new DefaultServiceInstance(serviceId + "2", serviceId, "localhost", 8082, false)));
        }
    }

}

