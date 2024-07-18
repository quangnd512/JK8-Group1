package hanu.edu.domain.i_repository.voucher;

import hanu.edu.domain.entity.VoucherEntity;
import hanu.edu.domain.model.voucher.Voucher;

import java.util.List;

public interface VoucherRepository {

    Voucher getById(long id);

    void save(VoucherEntity voucherEntity);

    void deleteById(long id);

    List<Voucher> getAllVouchers();

    List<Voucher> getVouchersByUserId(long id);
}
