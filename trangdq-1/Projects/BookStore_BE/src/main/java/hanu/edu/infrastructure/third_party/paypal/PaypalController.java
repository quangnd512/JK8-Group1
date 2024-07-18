package hanu.edu.infrastructure.third_party.paypal;

import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/order/paypal")
public class PaypalController {

    private static final String SUCCESS_URL = "success";
    private static final String CANCEL_URL = "cancel";

    @Autowired
    PaypalService service;

    @PostMapping("/transfer/{totalPrice}")
    public ResponseEntity<?> payMoney(@PathVariable double totalPrice) throws PayPalRESTException {
        Payment payment = service.createPayment(
                totalPrice,
                "USD",
                "PAYPAL",
                "sale",
                "Order",
                "http://localhost:3000/" + SUCCESS_URL,
                "http://localhost:3000/" + CANCEL_URL);
        return new ResponseEntity<>(payment.getLinks(), HttpStatus.OK);
    }
}
