package hanu.edu.infrastructure.security.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
// Base class for all responses that will be sent to the client.
public class BaseResponseDTO {
    private String code;
    private String message;
}
