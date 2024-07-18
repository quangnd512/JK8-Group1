package hanu.edu.domain.i_repository.admin;

import hanu.edu.domain.model.user.Admin;

public interface AdminRepository {

    void save(Admin admin);

    Admin getByUsername(String username);
}
