package hanu.edu.domain.i_repository.user;

import hanu.edu.domain.model.user.User;
import org.springframework.data.domain.Page;

public interface UserRepository {
    User getByUsername(String username);

    User getByEmail(String email);

    User getById(long id);

    Page<User> getAllByPage(int page, int i);

    void save(User user);

    void deleteById(long id);

}
