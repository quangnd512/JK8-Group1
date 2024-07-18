package hanu.edu.application.service.order;

import hanu.edu.application.service.voucher.VoucherResourceService;
import hanu.edu.domain.i_repository.order.OrderRepository;
import hanu.edu.domain.i_repository.product.ProductRepository;
import hanu.edu.domain.model.order.Order;
import hanu.edu.domain.model.order.OrderStatus;
import hanu.edu.domain.model.product.Product;
import hanu.edu.domain.model.voucher.Voucher;
import hanu.edu.infrastructure.security.exception.BaseException;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class GetOrderByStatusService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private VoucherResourceService voucherResourceService;

    public Page<OutputOrder> getUserOrdersByOrderStatus(long id, String status, int page, int size) {
        Page<Order> orders = orderRepository.getUserOrdersByOrderStatus(id, OrderStatus.of(status), page, size);
        return getOutputOrders(orders);
    }

    public Page<OutputOrder> getByOrderStatus(String status, int page, int size) {
        Page<Order> orders = orderRepository.getByOrderStatus(OrderStatus.of(status), page, size);
        return getOutputOrders(orders);
    }

    private Page<OutputOrder> getOutputOrders(Page<Order> orders) {
        if (orders == null) {
            throw new BaseException("404", "No order found!");
        }

        return orders.map(order -> {
            final double[] total = {0};
            Voucher voucher = voucherResourceService.getById(order.getVoucherId());

            List<OutputItemDetail> itemDetailList = order.getItems().stream()
                    .map(item -> {
                        Product product = productRepository.getById(item.getProductId());
                        return product != null ? new OutputItemDetail(product.getId(), product.getName(), product.getPrice(),
                                product.getImages(), item.getQuantity(), product.getCategory(), product.getDiscount())
                                : null;
                    })
                    .filter(Objects::nonNull)
                    .peek(detail -> total[0] += (detail.getPrice() - detail.getPrice() * detail.getDiscount() / 100) * detail.getQuantity())
                    .collect(Collectors.toList());

            if (voucher != null) {
                total[0] *= voucher.getRate();
            }

            return new OutputOrder(order.getId(), itemDetailList, order.getUserId(),
                    order.getVoucherId(), order.getCheckoutDate(),
                    order.getOrderStatus().toString(),
                    order.getPaymentMethod().toString(),
                    order.getMessage(), order.getAddressToReceive(), order.getUserInfo(), total[0]);
        });
    }


    @AllArgsConstructor
    @Getter
    public static class OutputOrder {
        private long id;
        private List<OutputItemDetail> items;
        private long userId;
        private long voucherId;
        private Date checkoutDate;
        private String orderStatus;
        private String paymentMethod;
        private String message;
        private String addressToReceive;
        private String userInfo;
        private double total;
    }

    @AllArgsConstructor
    @Getter
    public static class OutputItemDetail {
        private long productId;
        private String name;
        private double price;
        private List<String> images;
        private long quantity;
        private String category;
        private double discount;
    }
}
