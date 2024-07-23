package hanu.edu.infrastructure.impl_reporitory.voucher;

import hanu.edu.domain.entity.VoucherEntity;
import hanu.edu.domain.i_repository.voucher.VoucherJPARepository;
import hanu.edu.domain.i_repository.voucher.VoucherRepository;
import hanu.edu.domain.model.voucher.Voucher;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class VoucherRepositoryImpl implements VoucherRepository {
    @Autowired
    private VoucherJPARepository voucherJPARepository;
    @PersistenceContext
    private EntityManager em;

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
    public Page<Voucher> getAllByPage(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        return voucherJPARepository.findAll(pageRequest).map(VoucherEntity::toVoucher);
    }

    @Override
    public List<Voucher> getVouchersByUserIdAndIsUsed(long id, boolean isUsed) {
        List<Voucher> list = new ArrayList<>();
        List<VoucherEntity> entityList = voucherJPARepository.findByUserIdAndIsUsed(id, isUsed);
        for (VoucherEntity entity : entityList) {
            list.add(entity.toVoucher());
        }
        return list;
    }

    @Transactional
    @Override
    public void updateIsUsed(long id, boolean isUsed) {
        em.createQuery("UPDATE voucher SET isUsed = :isUsed WHERE id = :id")
                .setParameter("isUsed", isUsed)
                .setParameter("id", id)
                .executeUpdate();
        em.close();
    }

}
