package akdemy.edu.share.model;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import java.util.Collection;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
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
    private Collection<?> authorities;
    private boolean accountNonLocked = false;
    private boolean credentialsNonExpired = false;
    private boolean accountNonExpired = false;

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

}