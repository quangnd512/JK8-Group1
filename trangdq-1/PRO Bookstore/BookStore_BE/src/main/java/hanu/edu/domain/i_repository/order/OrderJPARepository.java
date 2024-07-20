package hanu.edu.domain.i_repository.order;

import hanu.edu.domain.entity.OrderEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderJPARepository extends JpaRepository<OrderEntity, Long> {
    Page<OrderEntity> findByOrderStatus(String status, Pageable pageable);

    Page<OrderEntity> findOrderEntitiesByUserIdAndOrderStatus(long id, String orderStatus, Pageable pageable);
}
