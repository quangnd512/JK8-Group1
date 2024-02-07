package hanu.edu.infrastructure.third_party.paypal;

import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/customer/paypal")
public class PaypalController {

    private static final String SUCCESS_URL = "success";
    private static final String CANCEL_URL = "cancel";

    @Autowired
    PaypalService service;

    @PostMapping("/pay/{totalPrice}")
    public ResponseEntity<?> payment(@PathVariable double totalPrice) throws PayPalRESTException {
        Payment payment = service.createPayment(
                totalPrice,
                "USD",
                "controller",
                "sale",
                "Order",
                "http://localhost:4200/" + SUCCESS_URL,
                "http://localhost:4200/" + CANCEL_URL);

        return new ResponseEntity<>(payment.getLinks(), org.springframework.http.HttpStatus.OK);
    }
}
