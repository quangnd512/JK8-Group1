package hanu.edu.application.controller.order;

import hanu.edu.application.dto.OrderDTO;
import hanu.edu.application.service.order.CheckoutOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CheckoutOrderController {
    @Autowired
    private CheckoutOrderService checkoutOrderService;

    @PostMapping("/order/{customerId}")
    public void checkoutOrder(@RequestBody OrderDTO orderDTO, @PathVariable long customerId) {
        checkoutOrderService.checkoutOrder(orderDTO, customerId);
    }
}
