package akdemy.edu.model;

import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.validator.constraints.Length;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class User {
    private long id;
    @NotEmpty(message = "Username cannot be empty.")
    private String username;
    @Email(message = "Invalid email.")
    private String email;
    @Length(min = 8, message = "Password should contains at least 8 characters.")
    private String password;
    private String name = "";
    private String address = "";
    @Pattern(regexp = "[0-9]{10}", message = "Invalid phone number.")
    private String phone = "0123456789";
    @Min(value = 10, message = "Age should not be less than 10.")
    @Max(value = 80, message = "Age should not be greater than 80.")
    private int age = 20;
    private String avatar;
    private boolean enabled;
    private String role;
}