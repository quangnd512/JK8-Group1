package akdemy.edu.controller;

import akdemy.edu.security.dto.BaseResponseDTO;
import akdemy.edu.security.dto.NewUserDTO;
import akdemy.edu.security.exception.BaseException;
import akdemy.edu.security.jwt.JwtService;
import akdemy.edu.security.service.SecurityService;
import akdemy.edu.share.Response;
import akdemy.edu.share.ResponseBuilder;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user-service")
public class AuthController {
    @Autowired
    private SecurityService securityService;

    @Autowired
    private JwtService jwtService;

    @Value("${server.port}")
    private String port;

    @PostMapping(value = "/register")
    public ResponseEntity<BaseResponseDTO> register(@Valid @RequestBody NewUserDTO newUserDTO) {
        return ResponseEntity.ok(securityService.registerAccount(newUserDTO));
    }

    @GetMapping(value = "/validate-token/{token}")
    public ResponseEntity<Response> validateToken(@PathVariable("token") String token) {
        if (jwtService.isValidToken(token)) {
            return ResponseBuilder.get200ResponseWithoutData("Valid token!");
        }
        throw new BaseException("500", "Invalid token!");
    }

    @GetMapping(value = "/port")
    public ResponseEntity<Response> getPort() {
        return ResponseBuilder.get200ResponseWithoutData("Port: " + port);
    }
}

