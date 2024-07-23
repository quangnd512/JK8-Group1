package hanu.edu.domain.model.user;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class Customer extends User {
    public Customer(long id, String username, String email, String password, String name, String address, String phone, int age, String avatar) {
        super(id, username, email, password, name, address, phone, age, avatar, true, "ROLE_CUSTOMER");
    }

    public Customer(String username, String email, String password) {
        super(username, email, password);
        setRole("ROLE_CUSTOMER");
        setEnabled(true);
    }
}
