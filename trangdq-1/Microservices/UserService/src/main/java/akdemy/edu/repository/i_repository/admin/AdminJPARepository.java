package akdemy.edu.repository.i_repository.admin;

import akdemy.edu.entity.AdminEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminJPARepository extends JpaRepository<AdminEntity, Long> {
    AdminEntity findByUsername(String username);
}
