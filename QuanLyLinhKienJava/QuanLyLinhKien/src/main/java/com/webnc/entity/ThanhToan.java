package com.webnc.entity;

import java.time.LocalDateTime;

public class ThanhToan {

    private int idThanhToan;

    private String idDonDat;

    // Quan hệ với DonDatHang (đã đổi thành camelCase)
    private DonDatHang donDatHang;

    private String phuongThuc;

    // C#: decimal -> Java: double
    private double soTien;

    private boolean daThanhToan;

    // C#: DateTime? -> Java: LocalDateTime
    private LocalDateTime ngayThanhToan;

    // C#: string? -> Java: String
    private String maGiaoDich;

    // 1. Constructor không tham số
    public ThanhToan() {
    }

    // 2. Constructor đầy đủ tham số
    public ThanhToan(int idThanhToan, String idDonDat, DonDatHang donDatHang, String phuongThuc, double soTien, boolean daThanhToan, LocalDateTime ngayThanhToan, String maGiaoDich) {
        this.idThanhToan = idThanhToan;
        this.idDonDat = idDonDat;
        this.donDatHang = donDatHang;
        this.phuongThuc = phuongThuc;
        this.soTien = soTien;
        this.daThanhToan = daThanhToan;
        this.ngayThanhToan = ngayThanhToan;
        this.maGiaoDich = maGiaoDich;
    }

    // 3. Getter và Setter
    public int getIdThanhToan() {
        return idThanhToan;
    }

    public void setIdThanhToan(int idThanhToan) {
        this.idThanhToan = idThanhToan;
    }

    public String getIdDonDat() {
        return idDonDat;
    }

    public void setIdDonDat(String idDonDat) {
        this.idDonDat = idDonDat;
    }

    public DonDatHang getDonDatHang() {
        return donDatHang;
    }

    public void setDonDatHang(DonDatHang donDatHang) {
        this.donDatHang = donDatHang;
    }

    public String getPhuongThuc() {
        return phuongThuc;
    }

    public void setPhuongThuc(String phuongThuc) {
        this.phuongThuc = phuongThuc;
    }

    public double getSoTien() {
        return soTien;
    }

    public void setSoTien(double soTien) {
        this.soTien = soTien;
    }

    public boolean isDaThanhToan() {
        return daThanhToan;
    }

    public void setDaThanhToan(boolean daThanhToan) {
        this.daThanhToan = daThanhToan;
    }

    public LocalDateTime getNgayThanhToan() {
        return ngayThanhToan;
    }

    public void setNgayThanhToan(LocalDateTime ngayThanhToan) {
        this.ngayThanhToan = ngayThanhToan;
    }

    public String getMaGiaoDich() {
        return maGiaoDich;
    }

    public void setMaGiaoDich(String maGiaoDich) {
        this.maGiaoDich = maGiaoDich;
    }
}