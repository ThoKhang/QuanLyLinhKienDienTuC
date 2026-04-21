package com.webnc.entity;

import java.time.LocalDateTime;
import java.util.List;

public class DonDatHang {

    private String idDonDat;

    private String idNguoiDung;

    // Quan hệ với ApplicationUser
    private ApplicationUser nguoiDung;

    private String sdtGiaoHang;

    private String soNha;

    private String trangThai;

    private String thanhToan;

    // Các trường thời gian (DateTime? bên C# chuyển thành LocalDateTime trong Java)
    // Tự động cho phép null vì đây là Object
    private LocalDateTime ngayDat;
    private LocalDateTime ngayThanhToan;
    private LocalDateTime ngayGiaoDuKien;

    private boolean daThanhToan = false;

    // Quan hệ 1-N: Một đơn hàng có nhiều chi tiết đơn hàng
    // Đổi tên biến thành số nhiều (chiTietDonHangs) cho đúng chuẩn Java
    private List<ChiTietDonHang> chiTietDonHangs;

    // 1. Constructor không tham số
    public DonDatHang() {
    }

    // 2. Constructor đầy đủ tham số
    public DonDatHang(String idDonDat, String idNguoiDung, ApplicationUser nguoiDung, String sdtGiaoHang, String soNha, String trangThai, String thanhToan, LocalDateTime ngayDat, LocalDateTime ngayThanhToan, LocalDateTime ngayGiaoDuKien, boolean daThanhToan, List<ChiTietDonHang> chiTietDonHangs) {
        this.idDonDat = idDonDat;
        this.idNguoiDung = idNguoiDung;
        this.nguoiDung = nguoiDung;
        this.sdtGiaoHang = sdtGiaoHang;
        this.soNha = soNha;
        this.trangThai = trangThai;
        this.thanhToan = thanhToan;
        this.ngayDat = ngayDat;
        this.ngayThanhToan = ngayThanhToan;
        this.ngayGiaoDuKien = ngayGiaoDuKien;
        this.daThanhToan = daThanhToan;
        this.chiTietDonHangs = chiTietDonHangs;
    }

    // 3. Getter và Setter
    public String getIdDonDat() {
        return idDonDat;
    }

    public void setIdDonDat(String idDonDat) {
        this.idDonDat = idDonDat;
    }

    public String getIdNguoiDung() {
        return idNguoiDung;
    }

    public void setIdNguoiDung(String idNguoiDung) {
        this.idNguoiDung = idNguoiDung;
    }

    public ApplicationUser getNguoiDung() {
        return nguoiDung;
    }

    public void setNguoiDung(ApplicationUser nguoiDung) {
        this.nguoiDung = nguoiDung;
    }

    public String getSdtGiaoHang() {
        return sdtGiaoHang;
    }

    public void setSdtGiaoHang(String sdtGiaoHang) {
        this.sdtGiaoHang = sdtGiaoHang;
    }

    public String getSoNha() {
        return soNha;
    }

    public void setSoNha(String soNha) {
        this.soNha = soNha;
    }

    public String getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(String trangThai) {
        this.trangThai = trangThai;
    }

    public String getThanhToan() {
        return thanhToan;
    }

    public void setThanhToan(String thanhToan) {
        this.thanhToan = thanhToan;
    }

    public LocalDateTime getNgayDat() {
        return ngayDat;
    }

    public void setNgayDat(LocalDateTime ngayDat) {
        this.ngayDat = ngayDat;
    }

    public LocalDateTime getNgayThanhToan() {
        return ngayThanhToan;
    }

    public void setNgayThanhToan(LocalDateTime ngayThanhToan) {
        this.ngayThanhToan = ngayThanhToan;
    }

    public LocalDateTime getNgayGiaoDuKien() {
        return ngayGiaoDuKien;
    }

    public void setNgayGiaoDuKien(LocalDateTime ngayGiaoDuKien) {
        this.ngayGiaoDuKien = ngayGiaoDuKien;
    }

    public boolean isDaThanhToan() {
        return daThanhToan;
    }

    public void setDaThanhToan(boolean daThanhToan) {
        this.daThanhToan = daThanhToan;
    }

    public List<ChiTietDonHang> getChiTietDonHangs() {
        return chiTietDonHangs;
    }

    public void setChiTietDonHangs(List<ChiTietDonHang> chiTietDonHangs) {
        this.chiTietDonHangs = chiTietDonHangs;
    }
}