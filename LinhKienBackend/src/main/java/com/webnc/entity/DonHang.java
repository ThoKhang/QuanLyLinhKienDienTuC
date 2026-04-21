package com.webnc.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;

@Entity
@Table(name = "don_hang")
@Data
public class DonHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "nguoi_dung_id")
    private NguoiDung nguoiDung;

    @Column(name = "ngay_dat")
    private Date ngayDat = new Date();

    @Column(name = "tong_tien", nullable = false)
    private Double tongTien;

    @Column(name = "dia_chi_giao_hang", nullable = false, columnDefinition = "NVARCHAR(MAX)")
    private String diaChiGiaoHang;

    @Column(name = "phuong_thuc_thanh_toan", nullable = false)
    private String phuongThucThanhToan;

    @Column(name = "trang_thai_don")
    private String trangThaiDon = "CHO_XAC_NHAN";

    @Column(name = "ghi_chu", columnDefinition = "NVARCHAR(MAX)")
    private String ghiChu;
}