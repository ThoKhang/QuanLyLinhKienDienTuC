package com.webnc.entity;

public class SanPham {

    // Khóa chính
    private String idSanPham;

    // Tương đương [Required]
    private String tenSanPham;

    private String imageUrl; // Đổi imageURL thành imageUrl cho chuẩn camelCase

    private String idCongTy;

    // Quan hệ N-1: Nhiều sản phẩm thuộc về một công ty/thương hiệu
    private CongTy congTy;

    private String idLoaiSanPham;

    // Quan hệ N-1: Nhiều sản phẩm thuộc một loại sản phẩm
    private LoaiSanPham loaiSanPham;

    // C#: decimal -> Java: double (hoặc BigDecimal)
    private double gia;

    private String moTa;

    private String imageLienQuan;

    private String thongSoSanPham;

    private int soLuongCanDuoi;

    private int soLuongHienCon;

    // 1. Constructor không tham số
    public SanPham() {
    }

    // 2. Constructor đầy đủ tham số
    public SanPham(String idSanPham, String tenSanPham, String imageUrl, String idCongTy, CongTy congTy, String idLoaiSanPham, LoaiSanPham loaiSanPham, double gia, String moTa, String imageLienQuan, String thongSoSanPham, int soLuongCanDuoi, int soLuongHienCon) {
        this.idSanPham = idSanPham;
        this.tenSanPham = tenSanPham;
        this.imageUrl = imageUrl;
        this.idCongTy = idCongTy;
        this.congTy = congTy;
        this.idLoaiSanPham = idLoaiSanPham;
        this.loaiSanPham = loaiSanPham;
        this.gia = gia;
        this.moTa = moTa;
        this.imageLienQuan = imageLienQuan;
        this.thongSoSanPham = thongSoSanPham;
        this.soLuongCanDuoi = soLuongCanDuoi;
        this.soLuongHienCon = soLuongHienCon;
    }

    // 3. Getter và Setter
    public String getIdSanPham() {
        return idSanPham;
    }

    public void setIdSanPham(String idSanPham) {
        this.idSanPham = idSanPham;
    }

    public String getTenSanPham() {
        return tenSanPham;
    }

    public void setTenSanPham(String tenSanPham) {
        this.tenSanPham = tenSanPham;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getIdCongTy() {
        return idCongTy;
    }

    public void setIdCongTy(String idCongTy) {
        this.idCongTy = idCongTy;
    }

    public CongTy getCongTy() {
        return congTy;
    }

    public void setCongTy(CongTy congTy) {
        this.congTy = congTy;
    }

    public String getIdLoaiSanPham() {
        return idLoaiSanPham;
    }

    public void setIdLoaiSanPham(String idLoaiSanPham) {
        this.idLoaiSanPham = idLoaiSanPham;
    }

    public LoaiSanPham getLoaiSanPham() {
        return loaiSanPham;
    }

    public void setLoaiSanPham(LoaiSanPham loaiSanPham) {
        this.loaiSanPham = loaiSanPham;
    }

    public double getGia() {
        return gia;
    }

    public void setGia(double gia) {
        this.gia = gia;
    }

    public String getMoTa() {
        return moTa;
    }

    public void setMoTa(String moTa) {
        this.moTa = moTa;
    }

    public String getImageLienQuan() {
        return imageLienQuan;
    }

    public void setImageLienQuan(String imageLienQuan) {
        this.imageLienQuan = imageLienQuan;
    }

    public String getThongSoSanPham() {
        return thongSoSanPham;
    }

    public void setThongSoSanPham(String thongSoSanPham) {
        this.thongSoSanPham = thongSoSanPham;
    }

    public int getSoLuongCanDuoi() {
        return soLuongCanDuoi;
    }

    public void setSoLuongCanDuoi(int soLuongCanDuoi) {
        this.soLuongCanDuoi = soLuongCanDuoi;
    }

    public int getSoLuongHienCon() {
        return soLuongHienCon;
    }

    public void setSoLuongHienCon(int soLuongHienCon) {
        this.soLuongHienCon = soLuongHienCon;
    }
}