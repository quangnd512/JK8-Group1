package hanu.edu.domain.i_repository.customer;

import hanu.edu.domain.model.user.Customer;

public interface CustomerRepository {
    Customer getById(long customerId);

    Customer getByEmail(String email);

    void save(Customer customer);

    void deleteById(long id);

}


