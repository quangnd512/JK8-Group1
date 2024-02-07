package akdemy.edu.repository.i_repository.user;

import akdemy.edu.model.User;
import org.springframework.data.domain.Page;

public interface UserRepository {
    User getByUsername(String username);

    User getById(long id);

    Page<User> getAllByPage(int page, int i);

    void save(User user);

    void deleteById(long id);

}
