package hanu.edu.infrastructure.impl_reporitory.user;

import hanu.edu.domain.entity.UserEntity;
import hanu.edu.domain.i_repository.user.UserJPARepository;
import hanu.edu.domain.i_repository.user.UserRepository;
import hanu.edu.domain.model.user.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepositoryImpl implements UserRepository {
    @Autowired
    private UserJPARepository userJPARepository;

    @PersistenceContext
    private EntityManager em;

    @Transactional
    public void save(User user) {
        // because user is saved as AdminEntity, CustomerEntity in DB
        // save UserEntity directly won't work

        // because original role of user can be different from new role
        // cannot simply cast to AdminEntity, CustomerEntity
        UserEntity userEntity = userJPARepository.findById(user.getId()).orElse(null);
        if (userEntity != null) {
            userEntity.setId(user.getId());
            userEntity.setUsername(user.getUsername());
            userEntity.setEmail(user.getEmail());
            userEntity.setPassword(user.getPassword());
            userEntity.setAddress(user.getAddress());
            userEntity.setAge(user.getAge());
            userEntity.setAvatar(user.getAvatar());
            userEntity.setEnabled(user.isEnabled());
            userEntity.setName(user.getName());
            userEntity.setPhone(user.getPhone());
            if (user.getRole().equals(userEntity.getRole())) {
                userJPARepository.save(userEntity);
            } else {
                userEntity.setRole(user.getRole());
                em.createQuery("UPDATE user SET dtype = :role WHERE id = :id")
                        .setParameter("role", user.getRole().equals("ROLE_ADMIN") ? "admin" : "user")
                        .setParameter("id", userEntity.getId())
                        .executeUpdate();
                em.close();
            }
            userJPARepository.save(userEntity);
        }
    }

    @Override
    public User getByUsername(String username) {
        UserEntity userEntity = userJPARepository.findByUsername(username);
        if (userEntity == null) {
            return null;
        }
        return userEntity.toUser();
    }

    @Override
    public User getByEmail(String email) {
        UserEntity userEntity = userJPARepository.findByEmail(email);
        if (userEntity == null) {
            return null;
        }
        return userEntity.toUser();
    }

    @Override
    public User getById(long id) {
        return userJPARepository.findById(id).map(UserEntity::toUser).orElse(null);
    }

    @Override
    public void deleteById(long id) {
        userJPARepository.deleteById(id);
    }

    @Override
    public Page<User> getAllByPage(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        return userJPARepository.findAll(pageRequest).map(UserEntity::toUser);
    }
}
