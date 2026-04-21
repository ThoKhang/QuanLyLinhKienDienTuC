package com.webnc.entity;

import java.time.LocalDateTime;

public class ThongBao {

    private int idThongBao;

    private String userId;

    // Quan hệ với ApplicationUser (đổi tên biến thành chữ thường)
    private ApplicationUser user;

    private String tieuDe;

    private String noiDung;

    // Khởi tạo giá trị mặc định giống hệt C#
    private boolean daDoc = false;

    private LocalDateTime ngayTao = LocalDateTime.now();

    // 1. Constructor không tham số
    public ThongBao() {
    }

    // 2. Constructor đầy đủ tham số
    public ThongBao(int idThongBao, String userId, ApplicationUser user, String tieuDe, String noiDung, boolean daDoc, LocalDateTime ngayTao) {
        this.idThongBao = idThongBao;
        this.userId = userId;
        this.user = user;
        this.tieuDe = tieuDe;
        this.noiDung = noiDung;
        this.daDoc = daDoc;
        this.ngayTao = ngayTao;
    }

    // 3. Getter và Setter
    public int getIdThongBao() {
        return idThongBao;
    }

    public void setIdThongBao(int idThongBao) {
        this.idThongBao = idThongBao;
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

    public String getTieuDe() {
        return tieuDe;
    }

    public void setTieuDe(String tieuDe) {
        this.tieuDe = tieuDe;
    }

    public String getNoiDung() {
        return noiDung;
    }

    public void setNoiDung(String noiDung) {
        this.noiDung = noiDung;
    }

    public boolean isDaDoc() {
        return daDoc;
    }

    public void setDaDoc(boolean daDoc) {
        this.daDoc = daDoc;
    }

    public LocalDateTime getNgayTao() {
        return ngayTao;
    }

    public void setNgayTao(LocalDateTime ngayTao) {
        this.ngayTao = ngayTao;
    }
}