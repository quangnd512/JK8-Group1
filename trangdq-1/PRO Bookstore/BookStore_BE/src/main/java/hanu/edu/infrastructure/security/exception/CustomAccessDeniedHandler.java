package hanu.edu.infrastructure.security.exception;

import hanu.edu.infrastructure.security.dto.BaseResponseDTO;
import hanu.edu.infrastructure.security.jwt.HelperUtils;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;

import java.io.IOException;

public class CustomAccessDeniedHandler implements AccessDeniedHandler {
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        BaseResponseDTO responseDTO = new BaseResponseDTO();
        responseDTO.setMessage("Access denied!");
        responseDTO.setCode(String.valueOf(HttpStatus.FORBIDDEN.value()));
        // convert the BaseResponseDTO object into a String value of application/json
        String json = HelperUtils.JSON_WRITER.writeValueAsString(responseDTO);
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        // sends response back to the client
        response.getWriter().write(json);
    }
}
