package akdemy.edu.repository.impl_repository;

import akdemy.edu.entity.UserEntity;
import akdemy.edu.model.User;
import akdemy.edu.repository.i_repository.user.UserJPARepository;
import akdemy.edu.repository.i_repository.user.UserRepository;
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
        // because impl_repository is saved as AdminEntity, CustomerEntity in DB
        // save UserEntity directly won't work

        // because original role of impl_repository can be different from new role
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
                        .setParameter("role", user.getRole().equals("ROLE_ADMIN") ? "admin" : "impl_repository")
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
