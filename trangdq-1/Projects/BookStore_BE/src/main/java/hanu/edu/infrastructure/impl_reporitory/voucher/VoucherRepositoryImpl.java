package hanu.edu.infrastructure.impl_reporitory.voucher;

import hanu.edu.domain.entity.VoucherEntity;
import hanu.edu.domain.i_repository.voucher.VoucherJPARepository;
import hanu.edu.domain.i_repository.voucher.VoucherRepository;
import hanu.edu.domain.model.voucher.Voucher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class VoucherRepositoryImpl implements VoucherRepository {
    @Autowired
    private VoucherJPARepository voucherJPARepository;

    @Override
    public Voucher getById(long id) {
        Optional<VoucherEntity> voucher = voucherJPARepository.findById(id);
        return voucher.map(VoucherEntity::toVoucher).orElse(null);
    }

    @Override
    public void save(VoucherEntity voucherEntity) {
        voucherJPARepository.save(voucherEntity);
    }


    @Override
    public void deleteById(long id) {
        voucherJPARepository.deleteById(id);
    }

    @Override
    public List<Voucher> getAllVouchers() {
        List<Voucher> list = new ArrayList<>();
        List<VoucherEntity> entityList = voucherJPARepository.findAll();
        for (VoucherEntity entity : entityList) {
            list.add(entity.toVoucher());
        }
        return list;
    }

    @Override
    public List<Voucher> getVouchersByUserId(long id) {
        List<Voucher> list = new ArrayList<>();
        List<VoucherEntity> entityList = voucherJPARepository.findByUserEntityId(id);
        for (VoucherEntity entity : entityList) {
            list.add(entity.toVoucher());
        }
        return list;
    }

}
