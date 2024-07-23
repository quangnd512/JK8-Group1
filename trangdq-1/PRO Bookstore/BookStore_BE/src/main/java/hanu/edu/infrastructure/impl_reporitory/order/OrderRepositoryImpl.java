package hanu.edu.infrastructure.impl_reporitory.order;

import hanu.edu.domain.entity.OrderEntity;
import hanu.edu.domain.i_repository.order.OrderJPARepository;
import hanu.edu.domain.i_repository.order.OrderRepository;
import hanu.edu.domain.model.order.Order;
import hanu.edu.domain.model.order.OrderStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

@Repository
public class OrderRepositoryImpl implements OrderRepository {

    @Autowired
    private OrderJPARepository orderJPARepository;

    @Override
    public void save(Order order) {
        orderJPARepository.save(OrderEntity.toEntity(order));
    }

    @Override
    public Order getById(long id) {
        return orderJPARepository.findById(id).get().toOrder();
    }

    @Override
    public Page<Order> getByOrderStatus(OrderStatus status, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        return orderJPARepository.findByOrderStatus(String.valueOf(status), pageRequest).map(OrderEntity::toOrder);
    }

    @Override
    public Page<Order> getUserOrdersByOrderStatus(long id, OrderStatus status, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        return orderJPARepository.findOrderEntitiesByUserIdAndOrderStatus(id, (String.valueOf(status)), pageRequest).map(OrderEntity::toOrder);
    }
}
