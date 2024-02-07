package hanu.edu.domain.model.voucher;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Voucher {
    private long id;
    private long customerId;
    private String title;
    private double rate;
    private Date dueDate;
    private String customerEmail;

    public Voucher(long customerId, String title, double rate, Date dueDate, String customerEmail) {
        this.customerId = customerId;
        this.title = title;
        this.rate = rate;
        this.dueDate = dueDate;
        this.customerEmail = customerEmail;
    }

    public Voucher(long customerId, String title, double rate, Date dueDate) {
        this.customerId = customerId;
        this.title = title;
        this.rate = rate;
        this.dueDate = dueDate;
    }

    public Voucher(long id, long customerId, String title, double rate, Date dueDate) {
        this.id = id;
        this.customerId = customerId;
        this.title = title;
        this.rate = rate;
        this.dueDate = dueDate;
    }


}
