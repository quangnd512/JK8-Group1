package hanu.edu.application.share;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class Response {
    private int status;
    private String message;
    private Object data;
}
