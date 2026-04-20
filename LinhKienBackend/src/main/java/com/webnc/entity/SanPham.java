package com.webnc.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;

@Entity
@Table(name = "san_pham")
@Data
public class SanPham {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ma_san_pham", unique = true, nullable = false)
    private String maSanPham;

    @Column(name = "ten_san_pham", nullable = false, columnDefinition = "NVARCHAR(200)")
    private String tenSanPham;

    @Column(name = "mo_ta", columnDefinition = "NVARCHAR(MAX)")
    private String moTa;

    @Column(name = "gia_ban", nullable = false)
    private Double giaBan;

    @Column(name = "so_luong_ton", nullable = false)
    private Integer soLuongTon = 0;

    @Column(name = "hinh_anh")
    private String hinhAnh;

    @Column(name = "thong_so_ky_thuat", columnDefinition = "NVARCHAR(MAX)")
    private String thongSoKyThuat; // Sẽ lưu chuỗi JSON ở đây

    // Khóa ngoại liên kết tới bảng Danh Mục
    @ManyToOne
    @JoinColumn(name = "danh_muc_id")
    private DanhMuc danhMuc;

    @Column(name = "ngay_tao")
    private Date ngayTao = new Date();
}