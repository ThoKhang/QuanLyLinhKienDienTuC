package com.webnc.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "chi_tiet_linh_kien")
@Data
public class ChiTietLinhKien {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "san_pham_id")
    @JsonIgnore // QUAN TRỌNG: Giúp JSON không bị lặp vô tận khi trả về React
    private SanPham sanPham;

    @Column(name = "ten_thong_so", nullable = false)
    private String tenThongSo;

    @Column(name = "gia_tri", nullable = false)
    private String giaTri;
}