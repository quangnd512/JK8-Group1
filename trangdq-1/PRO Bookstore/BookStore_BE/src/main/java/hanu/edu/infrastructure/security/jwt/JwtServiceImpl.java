package hanu.edu.infrastructure.security.jwt;

import hanu.edu.domain.model.user.User;
import hanu.edu.infrastructure.security.exception.BaseException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.security.Key;
import java.sql.Date;
import java.time.Instant;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class JwtServiceImpl implements JwtService {

    private final JwtConfig jwtConfig;

    private final UserDetailsService userDetailsService;

    @Override
    public Claims extractClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    @Override
    public Key getKey() { // generate private key
        // if keygen process encode to hex string, then now use BASE64
        byte[] key = Decoders.BASE64.decode(jwtConfig.getSecret());
        return Keys.hmacShaKeyFor(key);
    }

    @Override
    public String generateToken(User user) {
        // timestamp
        Instant now = Instant.now();
        // String role = user.getRole();
        // log.info("Roles: {} ", role);
        return Jwts.builder()
                .setSubject(user.getUsername())
                .claim("authority", user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList())) // only 1 --> authority
                .claim("role", user.getRole())
                .claim("isEnable", user.isEnabled())
                .setIssuedAt(Date.from(now)) // 0s
                .setExpiration(Date.from(now.plusSeconds(jwtConfig.getExpiration()))) // + 3600s
                .signWith(getKey(), SignatureAlgorithm.HS256) // data -hash-> hash -private-key-> digital signature
                .compact();
    }

    @Override
    public boolean isValidToken(String token) {
        final String username = extractUsername(token);
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        return !ObjectUtils.isEmpty(userDetails);
    }

    // extractAllClaims(token, claims -> username)
    private String extractUsername(String token) {
        return extractClaims(token, Claims::getSubject);
    }

    // extract all claims, transform to any Object (not just Claims)
    private <T> T extractClaims(String token, Function<Claims, T> claimsTFunction) {
        final Claims claims = extractAllClaims(token);
        // Function(claims) = T
        return claimsTFunction.apply(claims);
    }

    // extract all claims
    // why this method? to display errors in specific
    private Claims extractAllClaims(String token) {
        Claims claims;

        try {
            claims = Jwts.parserBuilder()
                    .setSigningKey(getKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
            throw new BaseException(String.valueOf(HttpStatus.UNAUTHORIZED.value()), "Token expiration");
        } catch (UnsupportedJwtException e) {
            throw new BaseException(String.valueOf(HttpStatus.UNAUTHORIZED.value()), "Token not supported");
        } catch (MalformedJwtException e) {
            throw new BaseException(String.valueOf(HttpStatus.UNAUTHORIZED.value()), "Invalid format 3 part of token");
        } catch (SignatureException e) {
            throw new BaseException(String.valueOf(HttpStatus.UNAUTHORIZED.value()), "Invalid format of token");
        } catch (Exception e) {
            throw new BaseException(String.valueOf(HttpStatus.UNAUTHORIZED.value()), e.getLocalizedMessage());
        }
        return claims;
    }

}
