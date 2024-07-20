package akdemy.edu.repository.i_repository.customer;

import akdemy.edu.entity.CustomerEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerJPARepository extends JpaRepository<CustomerEntity, Long> {
    CustomerEntity findByEmail(String email);

    CustomerEntity getById(long id);

}
