package akdemy.edu.security.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
// Request
public class LoginDTO {
    private String username;
    private String password;
}
