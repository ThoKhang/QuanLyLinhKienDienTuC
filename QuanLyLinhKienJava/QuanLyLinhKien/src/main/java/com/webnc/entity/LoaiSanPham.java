package com.webnc.entity;

public class LoaiSanPham {

    // Tương đương với [Key] trong C#
    private String idLoaiSanPham;

    // Tương đương với [Required] trong C#
    private String tenLoaiSanPham;

    // 1. Constructor không tham số
    public LoaiSanPham() {
    }

    // 2. Constructor có tham số
    public LoaiSanPham(String idLoaiSanPham, String tenLoaiSanPham) {
        this.idLoaiSanPham = idLoaiSanPham;
        this.tenLoaiSanPham = tenLoaiSanPham;
    }

    // 3. Getter và Setter
    public String getIdLoaiSanPham() {
        return idLoaiSanPham;
    }

    public void setIdLoaiSanPham(String idLoaiSanPham) {
        this.idLoaiSanPham = idLoaiSanPham;
    }

    public String getTenLoaiSanPham() {
        return tenLoaiSanPham;
    }

    public void setTenLoaiSanPham(String tenLoaiSanPham) {
        this.tenLoaiSanPham = tenLoaiSanPham;
    }
}