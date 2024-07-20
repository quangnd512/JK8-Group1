package hanu.edu.domain.entity;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import hanu.edu.domain.model.order.Order;
import hanu.edu.domain.model.order.OrderStatus;
import hanu.edu.domain.model.order.PaymentMethod;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Entity
@Table(name = "items_order")
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OrderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String items;
    private long userId;
    private long voucherId;
    private Date checkoutDate;
    private String orderStatus;
    private String paymentMethod;
    private String message;
    private String addressToReceive;
    @Column(columnDefinition = "TEXT")
    private String userInfo;
    @OneToOne
    @PrimaryKeyJoinColumn(name = "voucher_id")
    private VoucherEntity voucher;

    public static OrderEntity toEntity(Order order) {
        try {
            return OrderEntity.builder()
                    .id(order.getId())
                    .items(order.getItems() == null ? null :
                            new ObjectMapper().writeValueAsString(order.getItems()))
                    .userId(order.getUserId())
                    .voucherId(order.getVoucherId())
                    .checkoutDate(order.getCheckoutDate())
                    .orderStatus(String.valueOf(order.getOrderStatus()))
                    .paymentMethod(String.valueOf(order.getPaymentMethod()))
                    .message(order.getMessage())
                    .addressToReceive(order.getAddressToReceive())
                    .userInfo(order.getUserInfo()).build();
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public Order toOrder() {
        try {
            return new Order(id, new ObjectMapper().readValue(items, new TypeReference<>() {
            })
                    , userId, voucherId, checkoutDate,
                    OrderStatus.of(orderStatus), PaymentMethod.of(paymentMethod)
                    , message, addressToReceive, userInfo);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
