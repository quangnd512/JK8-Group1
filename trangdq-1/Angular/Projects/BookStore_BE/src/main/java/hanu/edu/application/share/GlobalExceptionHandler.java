package hanu.edu.application.share;

import org.springframework.http.HttpStatus;
import org.springframework.validation.BindException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

public class GlobalExceptionHandler {
    @ExceptionHandler(BindException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String handleBindException(BindException e) {
        String errorMessage = "Invalid DTO!";
        if (e.getBindingResult().hasErrors())
            return e.getBindingResult().getAllErrors().get(0).getDefaultMessage();
        return errorMessage;
    }
}
