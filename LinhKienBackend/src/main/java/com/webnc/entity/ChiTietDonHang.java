package com.webnc.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "chi_tiet_don_hang")
@Data
public class ChiTietDonHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "don_hang_id")
    private DonHang donHang;

    @ManyToOne
    @JoinColumn(name = "san_pham_id")
    private SanPham sanPham;

    @Column(name = "so_luong", nullable = false)
    private Integer soLuong;

    @Column(name = "don_gia", nullable = false)
    private Double donGia;
}