package hanu.edu.infrastructure.security.service;

import hanu.edu.infrastructure.security.dto.BaseResponseDTO;
import hanu.edu.infrastructure.security.dto.NewUserDTO;
import jakarta.transaction.Transactional;

public interface SecurityService {
    BaseResponseDTO registerAccount(NewUserDTO newUserDTO);

    @Transactional
    void generateUsersRoles();
}