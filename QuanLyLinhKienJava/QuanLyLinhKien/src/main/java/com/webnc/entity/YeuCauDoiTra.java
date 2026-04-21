package com.webnc.entity;

import java.time.LocalDateTime;

public class YeuCauDoiTra {

    private int idYeuCau;

    private String idDonDat;

    // Quan hệ với DonDatHang (đã đổi tên thành camelCase)
    private DonDatHang donDatHang;

    private String userId;

    // Quan hệ với ApplicationUser
    private ApplicationUser user;

    private String lyDo;

    private String trangThai;

    // Khởi tạo thời gian mặc định giống DateTime.Now trong C#
    private LocalDateTime ngayTao = LocalDateTime.now();

    // 1. Constructor không tham số
    public YeuCauDoiTra() {
    }

    // 2. Constructor đầy đủ tham số
    public YeuCauDoiTra(int idYeuCau, String idDonDat, DonDatHang donDatHang, String userId, ApplicationUser user, String lyDo, String trangThai, LocalDateTime ngayTao) {
        this.idYeuCau = idYeuCau;
        this.idDonDat = idDonDat;
        this.donDatHang = donDatHang;
        this.userId = userId;
        this.user = user;
        this.lyDo = lyDo;
        this.trangThai = trangThai;
        this.ngayTao = ngayTao;
    }

    // 3. Getter và Setter
    public int getIdYeuCau() {
        return idYeuCau;
    }

    public void setIdYeuCau(int idYeuCau) {
        this.idYeuCau = idYeuCau;
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

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public ApplicationUser getUser() {
        return user;
    }

    public void setUser(ApplicationUser user) {
        this.user = user;
    }

    public String getLyDo() {
        return lyDo;
    }

    public void setLyDo(String lyDo) {
        this.lyDo = lyDo;
    }

    public String getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(String trangThai) {
        this.trangThai = trangThai;
    }

    public LocalDateTime getNgayTao() {
        return ngayTao;
    }

    public void setNgayTao(LocalDateTime ngayTao) {
        this.ngayTao = ngayTao;
    }
}