package akdemy.edu.repository.i_repository.user;

import akdemy.edu.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserJPARepository extends JpaRepository<UserEntity, Long> {
    UserEntity findByUsername(String username);
}
