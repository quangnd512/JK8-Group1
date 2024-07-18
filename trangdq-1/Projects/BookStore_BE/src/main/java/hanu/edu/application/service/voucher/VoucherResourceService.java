package hanu.edu.application.service.voucher;

import hanu.edu.domain.entity.VoucherEntity;
import hanu.edu.domain.i_repository.voucher.VoucherRepository;
import hanu.edu.domain.model.voucher.Voucher;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class VoucherResourceService {
    private final VoucherRepository voucherRepository;

    public void create(Voucher voucher) {
        voucherRepository.save(VoucherEntity.toEntity(voucher));
    }

    public Voucher getById(long id) {
        return voucherRepository.getById(id);
    }

    public List<Voucher> getAllVouchers() {
        return voucherRepository.getAllVouchers();
    }

    public List<Voucher> getVouchersByUserId(long id) {
        return voucherRepository.getVouchersByUserId(id);
    }

    public void deleteById(long id) {
        voucherRepository.deleteById(id);
    }
}
