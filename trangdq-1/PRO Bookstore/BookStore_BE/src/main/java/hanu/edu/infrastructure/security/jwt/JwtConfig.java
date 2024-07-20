package hanu.edu.infrastructure.security.jwt;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;

@Getter
public class JwtConfig {
    @Value("${jwt.url}")
    private String url;

    @Value("${jwt.header}")
    private String header;

    @Value("${jwt.prefix}")
    private String prefix;

    @Value("${jwt.expiration}")
    private int expiration;

    @Value("${jwt.secret}")
    private String secret;
}
