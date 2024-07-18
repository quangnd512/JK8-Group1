package hanu.edu.application.controller.user;

import hanu.edu.infrastructure.security.dto.BaseResponseDTO;
import hanu.edu.infrastructure.security.dto.NewUserDTO;
import hanu.edu.infrastructure.security.service.SecurityService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CustomerRegisterController {
    @Autowired
    private SecurityService securityService;

    @PostMapping(value = "/register")
    public ResponseEntity<BaseResponseDTO> register(@Valid @RequestBody NewUserDTO newUserDTO) {
        return ResponseEntity.ok(securityService.registerAccount(newUserDTO));
    }
}

