package hanu.edu.application.controller.voucher;

import hanu.edu.application.dto.VoucherDTO;
import hanu.edu.application.service.user.UserResourceService;
import hanu.edu.application.service.voucher.VoucherResourceService;
import hanu.edu.application.share.Response;
import hanu.edu.application.share.ResponseBuilder;
import hanu.edu.domain.model.user.User;
import hanu.edu.domain.model.voucher.Voucher;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
public class VoucherResourceController {
    private final VoucherResourceService voucherResourceService;

    private final UserResourceService userResourceService;

    @PostMapping("/admin/voucher")
    public ResponseEntity<Response> create(@RequestBody VoucherDTO voucherDTO) {
        User user = userResourceService.getByEmail(voucherDTO.getUserEmail());
        voucherResourceService.create(new Voucher(voucherDTO.getTitle(), voucherDTO.getRate(), voucherDTO.getDueDate(), voucherDTO.getUserEmail(), user.getId()));
        return ResponseBuilder.get201ResponseWithoutData("Voucher created successfully!");
    }

    @GetMapping("/admin/vouchers")
    public ResponseEntity<Response> getAll() {
        return ResponseBuilder.get200ResponseWithData("Vouchers gotten successfully!", voucherResourceService.getAllVouchers());
    }

    @GetMapping("/admin/voucher/{id}")
    public ResponseEntity<Response> getById(@PathVariable long id) {
        return ResponseBuilder.get200ResponseWithData("Vouchers gotten successfully!", voucherResourceService.getById(id));
    }

    @DeleteMapping("/admin/voucher/{id}")
    public ResponseEntity<Response> deleteById(@PathVariable long id) {
        voucherResourceService.deleteById(id);
        return ResponseBuilder.get204Response("Voucher deleted!");
    }

    @GetMapping("/vouchers/{id}")
    public ResponseEntity<Response> getVouchersByUserId(@PathVariable long id){
        return ResponseBuilder.get200ResponseWithData("Voucher gotten successfully!", voucherResourceService.getVouchersByUserId(id));
    }
}
