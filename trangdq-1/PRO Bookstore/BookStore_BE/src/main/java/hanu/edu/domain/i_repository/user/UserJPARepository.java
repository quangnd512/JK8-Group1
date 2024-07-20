package hanu.edu.domain.i_repository.user;

import hanu.edu.domain.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserJPARepository extends JpaRepository<UserEntity, Long> {
    UserEntity findByUsername(String username);

    UserEntity findByEmail(String email);
}
