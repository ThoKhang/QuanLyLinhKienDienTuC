package com.webnc.entity;

public class ChiTietDonHang {

    private String idDonDat;

    private String idSanPham;

    private int soluong;

    // Trong C# là decimal (money), Java dùng double hoặc BigDecimal
    private double donGia;

    // Quan hệ với DonDatHang
    private DonDatHang donDatHang;

    // Quan hệ với SanPham
    private SanPham sanPham;

    // Constructor không tham số
    public ChiTietDonHang() {
    }

    // Constructor đầy đủ tham số
    public ChiTietDonHang(String idDonDat, String idSanPham, int soluong, double donGia, DonDatHang donDatHang, SanPham sanPham) {
        this.idDonDat = idDonDat;
        this.idSanPham = idSanPham;
        this.soluong = soluong;
        this.donGia = donGia;
        this.donDatHang = donDatHang;
        this.sanPham = sanPham;
    }

    // Getter và Setter
    public String getIdDonDat() {
        return idDonDat;
    }

    public void setIdDonDat(String idDonDat) {
        this.idDonDat = idDonDat;
    }

    public String getIdSanPham() {
        return idSanPham;
    }

    public void setIdSanPham(String idSanPham) {
        this.idSanPham = idSanPham;
    }

    public int getSoluong() {
        return soluong;
    }

    public void setSoluong(int soluong) {
        this.soluong = soluong;
    }

    public double getDonGia() {
        return donGia;
    }

    public void setDonGia(double donGia) {
        this.donGia = donGia;
    }

    public DonDatHang getDonDatHang() {
        return donDatHang;
    }

    public void setDonDatHang(DonDatHang donDatHang) {
        this.donDatHang = donDatHang;
    }

    public SanPham getSanPham() {
        return sanPham;
    }

    public void setSanPham(SanPham sanPham) {
        this.sanPham = sanPham;
    }
}