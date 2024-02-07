package hanu.edu.infrastructure.security.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class BaseException extends RuntimeException {
    private String code;
    private String message;
}
