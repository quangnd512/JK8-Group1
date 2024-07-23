package hanu.edu.infrastructure.security.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import hanu.edu.domain.model.user.User;
import hanu.edu.infrastructure.security.dto.BaseResponseDTO;
import hanu.edu.infrastructure.security.dto.LoginDTO;
import hanu.edu.infrastructure.security.jwt.HelperUtils;
import hanu.edu.infrastructure.security.jwt.JwtConfig;
import hanu.edu.infrastructure.security.jwt.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Slf4j
public class JwtUsernamePasswordAuthenticationFilter extends AbstractAuthenticationProcessingFilter {
    private final JwtService jwtService;

    private final ObjectMapper objectMapper;

    public JwtUsernamePasswordAuthenticationFilter(AuthenticationManager manager, JwtConfig jwtConfig, JwtService jwtService) {
        // for login attempt
        super(new AntPathRequestMatcher(jwtConfig.getUrl(), "POST"));
        this.jwtService = jwtService;
        this.objectMapper = new ObjectMapper();
        setAuthenticationManager(manager);
    }

    static void setupResponse(HttpServletResponse response, String localizedMessage) throws IOException {
        BaseResponseDTO responseDTO = new BaseResponseDTO();
        responseDTO.setCode(String.valueOf(HttpStatus.UNAUTHORIZED.value()));
        responseDTO.setMessage(localizedMessage);
        String json = HelperUtils.JSON_WRITER.writeValueAsString(responseDTO);
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json; charset=UTF-8");
        response.getWriter().write(json);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException {
        log.info("Start attempt to authentication.");
        // map request data to LoginDTO
        LoginDTO loginDTO = objectMapper.readValue(request.getInputStream(), LoginDTO.class);
        log.info("End attempt to authentication.");
        // authenticate user logging in
        return getAuthenticationManager().authenticate(new UsernamePasswordAuthenticationToken(loginDTO.getUsername(), loginDTO.getPassword(), Collections.emptyList()));
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException {
//        System.out.println(authentication.isAuthenticated());
//        System.out.println(authentication.getPrincipal().toString());
//        System.out.println(authentication.getCredentials().toString());
//        if (authentication.isAuthenticated()) {
        User user = (User) authentication.getPrincipal();
        String accessToken = jwtService.generateToken(user);
        Map map = new HashMap();
        map.put("accessToken", accessToken);
        map.put("userId", user.getId());
        map.put("role", user.getRole());
        String json = objectMapper.writeValueAsString(map);
        response.getWriter().write(json);
        response.setContentType("application/json; charset=UTF-8");
        log.info("End success authentication: {}", accessToken);
//        } else {
//            BaseResponseDTO responseDTO = new BaseResponseDTO();
//            responseDTO.setCode(String.valueOf(HttpStatus.UNAUTHORIZED.value()));
//            responseDTO.setMessage("Wrong password!");
//            String json = HelperUtils.JSON_WRITER.writeValueAsString(responseDTO);
//            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//            response.setContentType("application/json; charset=UTF-8");
//            response.getWriter().write(json);
//        }
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        setupResponse(response, failed.getLocalizedMessage());
    }
}
