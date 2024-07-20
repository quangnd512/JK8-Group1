package hanu.edu.domain.model.order;

import hanu.edu.domain.model.shopping_cart.Item;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.util.List;

@AllArgsConstructor
@Getter
public class Order {
    private long id;
    private List<Item> items;
    private long userId;
    private long voucherId;
    private Date checkoutDate;
    @Setter
    private OrderStatus orderStatus;
    private PaymentMethod paymentMethod;
    private String message;
    private String addressToReceive;
    private String userInfo;

    public Order(List<Item> items, long customerId, long voucherId, Date checkoutDate, OrderStatus orderStatus,
                 PaymentMethod paymentMethod, String message, String addressToReceive, String customerInfo) {
        this.items = items;
        this.userId = customerId;
        this.voucherId = voucherId;
        this.checkoutDate = checkoutDate;
        this.orderStatus = orderStatus;
        this.paymentMethod = paymentMethod;
        this.message = message;
        this.addressToReceive = addressToReceive;
        this.userInfo = customerInfo;
    }
}
