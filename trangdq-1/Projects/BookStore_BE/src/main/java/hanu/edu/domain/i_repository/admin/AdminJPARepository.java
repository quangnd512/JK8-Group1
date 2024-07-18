package hanu.edu.domain.i_repository.admin;

import hanu.edu.domain.entity.AdminEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminJPARepository extends JpaRepository<AdminEntity, Long> {
    AdminEntity findByUsername(String username);
}
