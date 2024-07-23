package akdemy.edu.repository.impl_repository;

import akdemy.edu.entity.CustomerEntity;
import akdemy.edu.model.Customer;
import akdemy.edu.repository.i_repository.customer.CustomerJPARepository;
import akdemy.edu.repository.i_repository.customer.CustomerRepository;
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
