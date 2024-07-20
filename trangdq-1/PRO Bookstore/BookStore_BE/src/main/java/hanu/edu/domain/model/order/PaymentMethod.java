package hanu.edu.domain.model.order;

import hanu.edu.infrastructure.security.exception.BaseException;

public enum PaymentMethod {
    CASH, PAYPAL;

    public static PaymentMethod of(String paymentMethod) {
        if (paymentMethod.equalsIgnoreCase("Cash")) {
            return CASH;
        } else if (paymentMethod.equalsIgnoreCase("Paypal")) {
            return PAYPAL;
        } else {
            throw new BaseException("500", "Invalid money method");
        }
    }
}
