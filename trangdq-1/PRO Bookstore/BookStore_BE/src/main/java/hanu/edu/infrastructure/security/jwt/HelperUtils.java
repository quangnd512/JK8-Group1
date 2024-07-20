package hanu.edu.infrastructure.security.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

public class HelperUtils {
    public static final ObjectWriter JSON_WRITER = new ObjectMapper().writer().withDefaultPrettyPrinter(); // Create a JSON object that is readable by the JWT library.
}
