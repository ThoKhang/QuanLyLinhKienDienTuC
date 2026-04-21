package com.webnc.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;

@Entity
@Table(name = "gio_hang")
@Data
public class GioHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Liên kết với bảng NguoiDung
    @ManyToOne
    @JoinColumn(name = "nguoi_dung_id")
    private NguoiDung nguoiDung;

    // Liên kết với bảng SanPham
    @ManyToOne
    @JoinColumn(name = "san_pham_id")
    private SanPham sanPham;

    @Column(name = "so_luong", nullable = false)
    private Integer soLuong;

    @Column(name = "ngay_them")
    private Date ngayThem = new Date();
}