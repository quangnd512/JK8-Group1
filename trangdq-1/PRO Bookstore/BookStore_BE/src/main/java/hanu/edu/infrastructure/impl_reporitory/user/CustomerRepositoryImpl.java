package hanu.edu.infrastructure.impl_reporitory.user;

import hanu.edu.domain.entity.CustomerEntity;
import hanu.edu.domain.i_repository.customer.CustomerJPARepository;
import hanu.edu.domain.i_repository.customer.CustomerRepository;
import hanu.edu.domain.model.user.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class CustomerRepositoryImpl implements CustomerRepository {
    @Autowired
    private CustomerJPARepository customerJPARepository;

    @Override
    public void save(Customer customer) {
        customerJPARepository.save(CustomerEntity.toEntity(customer));
    }

    @Override
    public Customer getByEmail(String email) {
        return customerJPARepository.findByEmail(email).toCustomer();
    }

    @Override
    public void deleteById(long id) {
        customerJPARepository.deleteById(id);
    }

    @Override
    public Customer getById(long customerId) {
        return customerJPARepository.getById(customerId).toCustomer();
    }
}
