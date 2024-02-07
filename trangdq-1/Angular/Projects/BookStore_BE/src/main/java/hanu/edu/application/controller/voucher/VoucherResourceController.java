package hanu.edu.application.controller.voucher;

import hanu.edu.application.dto.VoucherDTO;
import hanu.edu.application.service.user.UserResourceService;
import hanu.edu.application.service.voucher.VoucherResourceService;
import hanu.edu.domain.model.user.User;
import hanu.edu.domain.model.voucher.Voucher;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class VoucherResourceController {
    private final VoucherResourceService voucherResourceService;

    private final UserResourceService userResourceService;

    @PostMapping("/admin/voucher")
    public ResponseEntity<String> create(@RequestBody VoucherDTO voucherDTO) {
        voucherResourceService.create(new Voucher(voucherDTO.getCustomerId(), voucherDTO.getTitle(), voucherDTO.getRate(), voucherDTO.getDueDate()));
        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    @GetMapping("/admin/vouchers")
    public List<Voucher> getAll() {
        List<Voucher> vouchers = voucherResourceService.getAllVouchers();
        for (Voucher voucher : vouchers) {
            long userId = voucher.getCustomerId();
            User user = userResourceService.getById(userId);
            String email;
            if (user != null) {
                email = user.getEmail();
            } else {
                email = "";
            }
            voucher.setCustomerEmail(email);
        }
        return vouchers;
    }

    @GetMapping("/admin/voucher/{id}")
    public Voucher getById(@PathVariable long id) {
        return voucherResourceService.getById(id);
    }

    @DeleteMapping("/admin/voucher/{id}")
    public ResponseEntity<String> deleteById(@PathVariable long id) {
        voucherResourceService.deleteById(id);
        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    @GetMapping("/vouchers/{customerId}")
    public List<Voucher> getVouchersByUserId(@PathVariable long customerId) {
        return voucherResourceService.getVouchersByUserId(customerId);
    }
}
