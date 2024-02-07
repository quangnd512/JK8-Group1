package hanu.edu.application.dto;

import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class VoucherDTO {
    private long customerId;
    private String title;
    @Min(value = 0, message = "Invalid value")
    private double rate;
    private Date dueDate;
}
