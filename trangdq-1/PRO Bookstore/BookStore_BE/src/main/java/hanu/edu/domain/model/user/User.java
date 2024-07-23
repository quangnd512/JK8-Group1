package hanu.edu.domain.model.user;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class User implements UserDetails {
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

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<GrantedAuthority> authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority(this.role));
        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.enabled;
    }

}