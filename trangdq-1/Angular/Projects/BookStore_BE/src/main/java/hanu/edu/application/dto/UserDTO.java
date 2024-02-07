package hanu.edu.application.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserDTO {
    private long id;
    private String username;
    private String email;
    private String password;
    private String name;
    private String address;
    private String phone;
    private int age;
    private String avatar;
    private String role;
}
