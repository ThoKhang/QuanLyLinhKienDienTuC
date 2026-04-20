package com.webnc.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;

@Entity
@Table(name = "nguoi_dung")
@Data // Lombok tự động tạo Getter/Setter
public class NguoiDung {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ten_dang_nhap", unique = true, nullable = false)
    private String tenDangNhap;

    @Column(name = "mat_khau", nullable = false)
    private String matKhau;

    @Column(name = "ho_ten", nullable = false, columnDefinition = "NVARCHAR(100)")
    private String hoTen;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(name = "so_dien_thoai", length = 20)
    private String soDienThoai;

    @Column(name = "dia_chi", columnDefinition = "NVARCHAR(MAX)")
    private String diaChi;

    @Column(name = "vai_tro", length = 20)
    private String vaiTro = "USER";

    @Column(name = "trang_thai_hoat_dong")
    private Boolean trangThaiHoatDong = true;

    @Column(name = "ngay_tao", updatable = false)
    private Date ngayTao = new Date();
}