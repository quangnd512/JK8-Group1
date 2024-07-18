package akdemy.edu.repository.i_repository.customer;


import akdemy.edu.model.Customer;

public interface CustomerRepository {
    Customer getById(long customerId);

    Customer getByEmail(String email);

    void save(Customer customer);

    void deleteById(long id);

}


