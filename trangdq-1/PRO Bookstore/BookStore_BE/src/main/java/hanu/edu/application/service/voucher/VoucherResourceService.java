package hanu.edu.application.service.voucher;

import hanu.edu.domain.entity.VoucherEntity;
import hanu.edu.domain.i_repository.voucher.VoucherRepository;
import hanu.edu.domain.model.voucher.Voucher;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class VoucherResourceService {
    private final VoucherRepository voucherRepository;

    public void create(Voucher voucher) {
        voucherRepository.save(VoucherEntity.toEntity(voucher));
    }

    public void updateIsUsed(long id, boolean isUsed) {
        voucherRepository.updateIsUsed(id, isUsed);
    }

    public Voucher getById(long id) {
        return voucherRepository.getById(id);
    }

    public List<Voucher> getAllVouchers() {
        return voucherRepository.getAllVouchers();
    }

    public Page<Voucher> getAllByPage(int page, int size) {
        return voucherRepository.getAllByPage(page, size);
    }

    public List<Voucher> getVouchersByUserIdAndIsUsed(long id, boolean isUsed) {
        return voucherRepository.getVouchersByUserIdAndIsUsed(id, isUsed);
    }

    public void deleteById(long id) {
        voucherRepository.deleteById(id);
    }
}
