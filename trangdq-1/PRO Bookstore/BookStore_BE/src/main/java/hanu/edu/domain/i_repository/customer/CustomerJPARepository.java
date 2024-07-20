package hanu.edu.domain.i_repository.customer;

import hanu.edu.domain.entity.CustomerEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerJPARepository extends JpaRepository<CustomerEntity, Long> {
    CustomerEntity findByEmail(String email);

    CustomerEntity getById(long id);

}
