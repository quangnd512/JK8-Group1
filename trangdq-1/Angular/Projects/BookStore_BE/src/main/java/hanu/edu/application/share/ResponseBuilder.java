package hanu.edu.application.share;

import org.springframework.http.ResponseEntity;

public class ResponseBuilder {
    public static ResponseEntity<Response> get200ResponseWithData(String message, Object data) {
        return ResponseEntity.ok(
                Response.builder()
                        .status(200)
                        .message(message)
                        .data(data)
                        .build());
    }

    public static ResponseEntity<Response> get200ResponseWithoutData(String message) {
        return ResponseEntity.ok(
                Response.builder()
                        .status(200)
                        .message(message)
                        .build());
    }

    public static ResponseEntity<Response> get201ResponseWithData(String message, Object data) {
        return ResponseEntity.ok(
                Response.builder()
                        .status(201)
                        .message(message)
                        .data(data)
                        .build());
    }

    public static ResponseEntity<Response> get201ResponseWithoutData(String message) {
        return ResponseEntity.ok(
                Response.builder()
                        .status(201)
                        .message(message)
                        .build());
    }

    public static ResponseEntity<Response> get204Response(String message) {
        return ResponseEntity.ok(
                Response.builder()
                        .status(204)
                        .message(message)
                        .build());
    }

    public static ResponseEntity<Response> get500Response(String message) {
        return ResponseEntity.ok(
                Response.builder()
                        .status(500)
                        .message(message)
                        .build());
    }
}
