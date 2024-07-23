package hanu.edu.domain.model.order;

import hanu.edu.infrastructure.security.exception.BaseException;

public enum OrderStatus {
    SUCCESS, SHIPPING, ADMIN_PREPARING, CUSTOMER_CONFIRMED, CANCELED, CUSTOMER_REQUEST_CANCEL;

    public static OrderStatus of(String orderStatus) {
        switch (orderStatus.toUpperCase()) {
            case "SUCCESS" -> {
                return SUCCESS;
            }
            case "SHIPPING" -> {
                return SHIPPING;
            }
            case "ADMIN_PREPARING" -> {
                return ADMIN_PREPARING;
            }
            case "CUSTOMER_REQUEST_CANCEL" -> {
                return CUSTOMER_REQUEST_CANCEL;
            }
            case "CUSTOMER_CONFIRMED" -> {
                return CUSTOMER_CONFIRMED;
            }
            case "CANCELED" -> {
                return CANCELED;
            }
            default -> {
                throw new BaseException("500", "Invalid order status");
            }
        }
    }
}
