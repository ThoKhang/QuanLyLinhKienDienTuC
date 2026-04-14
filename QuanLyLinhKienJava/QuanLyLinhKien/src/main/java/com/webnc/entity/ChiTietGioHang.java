package com.webnc.entity;

public class ChiTietGioHang {

    private String idChiTietGioHang;

    private String idNguoiDung;

    // Quan hệ với ApplicationUser
    private ApplicationUser user;

    private String idSanPham;

    // Quan hệ với SanPham (đã đổi tên biến thành chữ thường cho đúng chuẩn Java)
    private SanPham sanPham;

    // Tương đương với thuộc tính soLuongTrongGio có [Range(1,10001)] bên C#
    private int soLuongTrongGio;

    // Constructor không tham số
    public ChiTietGioHang() {
    }

    // Constructor đầy đủ tham số
    public ChiTietGioHang(String idChiTietGioHang, String idNguoiDung, ApplicationUser user, String idSanPham, SanPham sanPham, int soLuongTrongGio) {
        this.idChiTietGioHang = idChiTietGioHang;
        this.idNguoiDung = idNguoiDung;
        this.user = user;
        this.idSanPham = idSanPham;
        this.sanPham = sanPham;
        this.soLuongTrongGio = soLuongTrongGio;
    }

    // Getter và Setter
    public String getIdChiTietGioHang() {
        return idChiTietGioHang;
    }

    public void setIdChiTietGioHang(String idChiTietGioHang) {
        this.idChiTietGioHang = idChiTietGioHang;
    }

    public String getIdNguoiDung() {
        return idNguoiDung;
    }

    public void setIdNguoiDung(String idNguoiDung) {
        this.idNguoiDung = idNguoiDung;
    }

    public ApplicationUser getUser() {
        return user;
    }

    public void setUser(ApplicationUser user) {
        this.user = user;
    }

    public String getIdSanPham() {
        return idSanPham;
    }

    public void setIdSanPham(String idSanPham) {
        this.idSanPham = idSanPham;
    }

    public SanPham getSanPham() {
        return sanPham;
    }

    public void setSanPham(SanPham sanPham) {
        this.sanPham = sanPham;
    }

    public int getSoLuongTrongGio() {
        return soLuongTrongGio;
    }

    public void setSoLuongTrongGio(int soLuongTrongGio) {
        this.soLuongTrongGio = soLuongTrongGio;
    }
}