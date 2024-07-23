package hanu.edu.domain.i_repository.voucher;

import hanu.edu.domain.entity.VoucherEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface VoucherJPARepository extends JpaRepository<VoucherEntity, Long> {
    List<VoucherEntity> findByUserEntityId(long id);

    List<VoucherEntity> findByUserIdAndIsUsed(long id, boolean isUsed);
}
