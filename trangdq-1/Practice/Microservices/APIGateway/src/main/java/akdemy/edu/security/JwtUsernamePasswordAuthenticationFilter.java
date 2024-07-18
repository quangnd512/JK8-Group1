//package akdemy.edu.security;
//
//import akdemy.edu.model.User;
//import akdemy.edu.security.dto.BaseResponseDTO;
//import akdemy.edu.security.dto.LoginDTO;
//import akdemy.edu.security.jwt.HelperUtils;
//import akdemy.edu.security.jwt.JwtConfig;
//import akdemy.edu.security.jwt.JwtService;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.http.HttpStatus;
//
//import java.io.IOException;
//import java.util.Collections;
//import java.util.HashMap;
//import java.util.Map;
//
//@Slf4j
//public class JwtUsernamePasswordAuthenticationFilter extends AbstractAuthenticationProcessingFilter {
//    private final JwtService jwtService;
//
//    private final ObjectMapper objectMapper;
//
//    public JwtUsernamePasswordAuthenticationFilter(AuthenticationManager manager, JwtConfig jwtConfig, JwtService jwtService) {
//        // for login attempt
//        super(new AntPathRequestMatcher(jwtConfig.getUrl(), "POST"));
//        this.jwtService = jwtService;
//        this.objectMapper = new ObjectMapper();
//        setAuthenticationManager(manager);
//    }
//
//    static void setupResponse(HttpServletResponse response, String localizedMessage) throws IOException {
//        BaseResponseDTO responseDTO = new BaseResponseDTO();
//        responseDTO.setStatus(String.valueOf(HttpStatus.UNAUTHORIZED.value()));
//        responseDTO.setMessage(localizedMessage);
//        String json = HelperUtils.JSON_WRITER.writeValueAsString(responseDTO);
//        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//        response.setContentType("application/json; charset=UTF-8");
//        response.getWriter().write(json);
//    }
//
//    @Override
//    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException {
//        log.info("Start attempt to authentication.");
//        // map request data to LoginDTO
//        LoginDTO loginDTO = objectMapper.readValue(request.getInputStream(), LoginDTO.class);
//        log.info("End attempt to authentication.");
//        // authenticate user logging in
//        return getAuthenticationManager().authenticate(new UsernamePasswordAuthenticationToken(loginDTO.getUsername(), loginDTO.getPassword(), Collections.emptyList()));
//    }
//
//    @Override
//    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException {
//        if (authentication.getPrincipal() instanceof User user) {
//            String accessToken = jwtService.generateToken(user);
//            Map<String, Object> map = new HashMap<>();
//            map.put("accessToken", accessToken);
//            map.put("userId", user.getId());
//            map.put("role", user.getRole());
//            String json = objectMapper.writeValueAsString(map);
//            response.getWriter().write(json);
//            response.setContentType("application/json; charset=UTF-8");
//            log.info("End success authentication: {}", accessToken);
//        } else {
//            BaseResponseDTO responseDTO = new BaseResponseDTO();
//            responseDTO.setStatus(String.valueOf(HttpStatus.UNAUTHORIZED.value()));
//            responseDTO.setMessage("Wrong password!");
//            String json = HelperUtils.JSON_WRITER.writeValueAsString(responseDTO);
//            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//            response.setContentType("application/json; charset=UTF-8");
//            response.getWriter().write(json);
//        }
//    }
//
//    @Override
//    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
//        setupResponse(response, failed.getLocalizedMessage());
//    }
//}
