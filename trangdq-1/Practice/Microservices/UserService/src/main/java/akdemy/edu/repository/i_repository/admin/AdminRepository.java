package akdemy.edu.repository.i_repository.admin;


import akdemy.edu.model.Admin;

public interface AdminRepository {

    void save(Admin admin);

    Admin getByUsername(String username);
}
