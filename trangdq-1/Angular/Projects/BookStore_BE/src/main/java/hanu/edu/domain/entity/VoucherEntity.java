package hanu.edu.domain.entity;

import hanu.edu.domain.model.voucher.Voucher;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Entity(name = "voucher")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class VoucherEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long userId;
    private String title;
    private double rate;
    private Date dueDate;
    @ManyToOne
    @JoinColumn(name = "user")
    private UserEntity userEntity;

    public static VoucherEntity toEntity(Voucher voucher) {
        return VoucherEntity.builder()
                .id(voucher.getId())
                .userId(voucher.getCustomerId())
                .title(voucher.getTitle())
                .rate(voucher.getRate())
                .dueDate(voucher.getDueDate())
                .build();
    }

    public Voucher toVoucher() {
        return new Voucher(id, userId, title, rate, dueDate);
    }

}
