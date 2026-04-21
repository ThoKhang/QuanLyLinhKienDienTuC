package com.webnc.entity;

import java.time.LocalDateTime;
import java.util.List;

public class DanhGiaSanPham {

    private int idDanhGia;

    private String idSanPham;

    // Quan hệ với SanPham
    private SanPham sanPham;

    // Trong Java, String mặc định đã có thể chứa null (tương đương string?)
    private String userId;

    // Quan hệ với ApplicationUser
    private ApplicationUser user;

    private String idDonDat;

    // Quan hệ với DonDatHang
    private DonDatHang donDatHang;

    // Tương đương [Range(1, 5)] bên C#
    private int soSao;

    // Tương đương [StringLength(500)] bên C#
    private String noiDung;

    // Khởi tạo thời gian mặc định giống DateTime.Now
    private LocalDateTime ngayDanhGia = LocalDateTime.now();

    // Quan hệ 1-N: Một đánh giá có thể có nhiều hình ảnh kèm theo
    private List<HinhAnhDanhGia> hinhAnhDanhGias;

    // 1. Constructor không tham số
    public DanhGiaSanPham() {
    }

    // 2. Constructor đầy đủ tham số
    public DanhGiaSanPham(int idDanhGia, String idSanPham, SanPham sanPham, String userId, ApplicationUser user, String idDonDat, DonDatHang donDatHang, int soSao, String noiDung, LocalDateTime ngayDanhGia, List<HinhAnhDanhGia> hinhAnhDanhGias) {
        this.idDanhGia = idDanhGia;
        this.idSanPham = idSanPham;
        this.sanPham = sanPham;
        this.userId = userId;
        this.user = user;
        this.idDonDat = idDonDat;
        this.donDatHang = donDatHang;
        this.soSao = soSao;
        this.noiDung = noiDung;
        this.ngayDanhGia = ngayDanhGia;
        this.hinhAnhDanhGias = hinhAnhDanhGias;
    }

    // 3. Getter và Setter
    public int getIdDanhGia() {
        return idDanhGia;
    }

    public void setIdDanhGia(int idDanhGia) {
        this.idDanhGia = idDanhGia;
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

    public int getSoSao() {
        return soSao;
    }

    public void setSoSao(int soSao) {
        this.soSao = soSao;
    }

    public String getNoiDung() {
        return noiDung;
    }

    public void setNoiDung(String noiDung) {
        this.noiDung = noiDung;
    }

    public LocalDateTime getNgayDanhGia() {
        return ngayDanhGia;
    }

    public void setNgayDanhGia(LocalDateTime ngayDanhGia) {
        this.ngayDanhGia = ngayDanhGia;
    }

    public List<HinhAnhDanhGia> getHinhAnhDanhGias() {
        return hinhAnhDanhGias;
    }

    public void setHinhAnhDanhGias(List<HinhAnhDanhGia> hinhAnhDanhGias) {
        this.hinhAnhDanhGias = hinhAnhDanhGias;
    }
}