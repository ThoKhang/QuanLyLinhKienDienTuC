package com.webnc.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;

@Entity
@Table(name = "danh_muc")
@Data
public class DanhMuc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ten_danh_muc", unique = true, nullable = false)
    private String tenDanhMuc;

    @Column(name = "mo_ta", columnDefinition = "NVARCHAR(MAX)")
    private String moTa;

    @Column(name = "ngay_tao")
    private Date ngayTao = new Date();
}