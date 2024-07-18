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
    @Column(name="user_id")
    private long userId;
    private String userEmail;
    private String title;
    private double rate;
    private Date dueDate;
    @ManyToOne(targetEntity = UserEntity.class)
    @JoinColumn(name = "user_id", referencedColumnName = "id", updatable=false, insertable=false)
    private UserEntity userEntity;

    public static VoucherEntity toEntity(Voucher voucher) {
        return VoucherEntity.builder()
                .id(voucher.getId())
                .userEmail(voucher.getUserEmail())
                .title(voucher.getTitle())
                .rate(voucher.getRate())
                .dueDate(voucher.getDueDate())
                .userId(voucher.getUserId())
                .build();
    }

    public Voucher toVoucher() {
        return new Voucher(id, title, rate, dueDate, userEmail, userId);
    }

}
