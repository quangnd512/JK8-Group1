package hanu.edu.domain.i_repository.order;

import hanu.edu.domain.model.order.Order;
import hanu.edu.domain.model.order.OrderStatus;
import org.springframework.data.domain.Page;

public interface OrderRepository {
    void save(Order order);

    Order getById(long id);

    Page<Order> getByOrderStatus(OrderStatus status, int page, int size);

    Page<Order> getUserOrdersByOrderStatus(long id, OrderStatus status, int page, int size);
}
