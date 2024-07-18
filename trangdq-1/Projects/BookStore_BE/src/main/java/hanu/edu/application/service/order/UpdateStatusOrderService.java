package hanu.edu.application.service.order;

import hanu.edu.domain.i_repository.order.OrderRepository;
import hanu.edu.domain.model.order.Order;
import hanu.edu.domain.model.order.OrderStatus;
import hanu.edu.infrastructure.security.exception.BaseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UpdateStatusOrderService {

    @Autowired
    private OrderRepository orderRepository;

    public void updateStatusOrder(long id, String fromStatus, String toStatus) {
        if (fromStatus.equalsIgnoreCase(String.valueOf(OrderStatus.SHIPPING)) &&
                toStatus.equalsIgnoreCase(String.valueOf(OrderStatus.CUSTOMER_REQUEST_CANCEL))) {
            throw new BaseException("400", "Not allow to cancel while shipping!");
        }
        Order order = orderRepository.getById(id);
        order.setOrderStatus(OrderStatus.of(toStatus));
        orderRepository.save(order);
    }
}
