package akdemy.edu.repository.impl_repository;

import akdemy.edu.entity.AdminEntity;
import akdemy.edu.model.Admin;
import akdemy.edu.repository.i_repository.admin.AdminJPARepository;
import akdemy.edu.repository.i_repository.admin.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class AdminRepositoryImpl implements AdminRepository {
    @Autowired
    private AdminJPARepository adminJPARepository;

    @Override
    public void save(Admin admin) {
        adminJPARepository.save(AdminEntity.toEntity(admin));
    }

    @Override
    public Admin getByUsername(String username) {
        return adminJPARepository.findByUsername(username).toAdmin();
    }
}
