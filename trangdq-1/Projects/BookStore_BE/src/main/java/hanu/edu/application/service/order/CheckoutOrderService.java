package hanu.edu.application.service.order;

import hanu.edu.application.dto.OrderDTO;
import hanu.edu.application.service.voucher.VoucherResourceService;
import hanu.edu.domain.i_repository.order.OrderRepository;
import hanu.edu.domain.model.order.Order;
import hanu.edu.domain.model.order.OrderStatus;
import hanu.edu.domain.model.order.PaymentMethod;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;

@Service
public class CheckoutOrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private VoucherResourceService voucherResourceService;

    public void checkoutOrder(@NotNull OrderDTO orderDTO, long customerId) {
        orderRepository.save(new Order(
                orderDTO.getItems(),
                customerId,
                orderDTO.getVoucherId(),
                new Date(System.currentTimeMillis()),
                OrderStatus.CUSTOMER_CONFIRMED,
                PaymentMethod.of(orderDTO.getPaymentMethod()),
                orderDTO.getMessage(),
                orderDTO.getAddressToReceive(),
                orderDTO.getUserName() + ", " + orderDTO.getUserPhone()));
        if (orderDTO.getVoucherId() != 0) {
            voucherResourceService.deleteById(orderDTO.getVoucherId());
        }
    }
}
