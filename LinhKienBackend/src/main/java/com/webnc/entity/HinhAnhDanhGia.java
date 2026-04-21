package com.webnc.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "hinh_anh_danh_gia")
@Data
public class HinhAnhDanhGia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "danh_gia_id")
    @JsonIgnore // Quan trọng: Để tránh vòng lặp vô tận khi chuyển sang JSON
    private DanhGiaSanPham danhGia;

    @Column(name = "url_hinh_anh", nullable = false)
    private String urlHinhAnh;
}