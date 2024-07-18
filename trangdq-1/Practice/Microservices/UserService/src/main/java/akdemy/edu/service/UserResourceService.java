package akdemy.edu.service;

import akdemy.edu.model.User;
import akdemy.edu.repository.i_repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

//CRUD methods
@Service
public class UserResourceService {

    @Autowired
    private UserRepository userRepository;

    public User getById(long id) {
        return userRepository.getById(id);
    }

    public void update(User user) {
        if (userRepository.getById(user.getId()) != null) {
            userRepository.save(user);
        }
    }

    public void deleteById(long id) {
        userRepository.deleteById(id);
    }

    public Page<User> getAllByPage(int page, int size) {
        return userRepository.getAllByPage(page, size);
    }

    public User getByUsername(String username) {
        return userRepository.getByUsername(username);
    }
}
