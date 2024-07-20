package hanu.edu.domain.model.user;

import lombok.Getter;

@Getter
public class Admin extends User {
    public Admin(String username, String email, String password) {
        super(username, email, password);
        setRole("ROLE_ADMIN");
        setEnabled(true);
    }

    public Admin(long id, String username, String email, String password, String name, String address, String phone, int age, String avatar) {
        super(id, username, email, password, name, address, phone, age, avatar, true, "ROLE_ADMIN");
    }
}
