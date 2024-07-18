//package akdemy.edu;
//
//import akdemy.edu.security.JwtAuthenticationFilter;
//import akdemy.edu.security.jwt.JwtConfig;
//import akdemy.edu.security.jwt.JwtService;
//import akdemy.edu.security.jwt.JwtServiceImpl;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//@Configuration
//public class SecurityConfig {
//    @Bean
//    public JwtService jwtService() {
//        return new JwtServiceImpl(jwtConfig());
//    }
//
//    @Bean
//    public JwtConfig jwtConfig() {
//        return new JwtConfig();
//    }
//
//    @Bean
//    public JwtAuthenticationFilter jwtAuthenticationFilter() {
//        return new JwtAuthenticationFilter(jwtConfig, jwtService);
//    }
//}
