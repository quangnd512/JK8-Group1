package hanu.edu.infrastructure.security.config;


import hanu.edu.infrastructure.security.jwt.JwtConfig;
import hanu.edu.infrastructure.security.jwt.JwtService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.ObjectUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
public class JwtTokenAuthenticationFilter extends OncePerRequestFilter {
    private final JwtConfig jwtConfig;
    private final JwtService jwtService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String accessToken = request.getHeader(jwtConfig.getHeader());
        log.info("Start do filter once per request, {}", request.getRequestURI());

        if (!ObjectUtils.isEmpty(accessToken) && accessToken.startsWith(jwtConfig.getPrefix() + " ")) {
            accessToken = accessToken.substring((jwtConfig.getPrefix() + " ").length());
            try {
                if (jwtService.isValidToken(accessToken)) {
                    Claims claims = jwtService.extractClaims(accessToken);
                    String username = claims.getSubject();
                    List<String> authorities = claims.get("authority", List.class);
                    if (!ObjectUtils.isEmpty(username)) {
                        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                                username,
                                null,
                                authorities.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList()));
                        SecurityContextHolder.getContext().setAuthentication(auth);
                    }
                }
            } catch (Exception e) {
                log.error("Error on filter once per request, path {}, error: {}", request.getRequestURI(), e.getMessage());
                JwtUsernamePasswordAuthenticationFilter.setupResponse(response, e.getLocalizedMessage());
                return;
            }
        }
        log.info("End do filter: {}", request.getRequestURI());
        filterChain.doFilter(request, response);
    }
}
