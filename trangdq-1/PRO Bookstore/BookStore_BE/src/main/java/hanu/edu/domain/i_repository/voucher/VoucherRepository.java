package hanu.edu.domain.i_repository.voucher;

import hanu.edu.domain.entity.VoucherEntity;
import hanu.edu.domain.model.voucher.Voucher;
import org.springframework.data.domain.Page;

import java.util.List;

public interface VoucherRepository {

    Voucher getById(long id);

    void save(VoucherEntity voucherEntity);

    void deleteById(long id);

    List<Voucher> getAllVouchers();

    Page<Voucher> getAllByPage(int page, int size);

    List<Voucher> getVouchersByUserIdAndIsUsed(long id, boolean isUsed);

    void updateIsUsed(long id, boolean isUsed);
}
