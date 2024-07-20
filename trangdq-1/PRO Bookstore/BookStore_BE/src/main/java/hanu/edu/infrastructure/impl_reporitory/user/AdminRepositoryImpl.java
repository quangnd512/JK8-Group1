package hanu.edu.infrastructure.impl_reporitory.user;

import hanu.edu.domain.entity.AdminEntity;
import hanu.edu.domain.i_repository.admin.AdminJPARepository;
import hanu.edu.domain.i_repository.admin.AdminRepository;
import hanu.edu.domain.model.user.Admin;
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
