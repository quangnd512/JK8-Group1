package hanu.edu.infrastructure.security.jwt;

import hanu.edu.domain.model.user.User;
import io.jsonwebtoken.Claims;

import java.security.Key;

// Defines the methods for extracting claims from a JWT token and generating tokens.
public interface JwtService {

    /**
     * Takes in a token string and returns an array of claims.
     */
    Claims extractClaims(String token);


    /**
     * Retrieve the key from the JwtService instance.
     */
    Key getKey();

    /**
     * Generates a new token based on user information
     */
    String generateToken(User user);

    /**
     * Checks if the given token is valid or not.
     */
    boolean isValidToken(String token);
}
