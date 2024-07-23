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
    private String title;
    private double rate;
    private Date dueDate;
    private String userEmail;
    private long userId;
    private boolean isUsed;

    public Voucher(String title, double rate, Date dueDate, String userEmail, long userId, boolean isUsed) {
        this.title = title;
        this.rate = rate;
        this.dueDate = dueDate;
        this.userEmail = userEmail;
        this.userId = userId;
        this.isUsed = isUsed;
    }
}
