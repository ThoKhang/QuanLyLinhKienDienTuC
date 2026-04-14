package com.webnc.entity;

public class HinhAnhDanhGia {

    private int idHinhAnh;

    // C#: int? -> Java: Integer (để cho phép giá trị null nếu cần)
    private Integer idDanhGia;

    // Quan hệ với DanhGiaSanPham (đã đổi tên biến thành camelCase)
    private DanhGiaSanPham danhGiaSanPham;

    private String imageUrl;

    // 1. Constructor không tham số
    public HinhAnhDanhGia() {
    }

    // 2. Constructor đầy đủ tham số
    public HinhAnhDanhGia(int idHinhAnh, Integer idDanhGia, DanhGiaSanPham danhGiaSanPham, String imageUrl) {
        this.idHinhAnh = idHinhAnh;
        this.idDanhGia = idDanhGia;
        this.danhGiaSanPham = danhGiaSanPham;
        this.imageUrl = imageUrl;
    }

    // 3. Getter và Setter
    public int getIdHinhAnh() {
        return idHinhAnh;
    }

    public void setIdHinhAnh(int idHinhAnh) {
        this.idHinhAnh = idHinhAnh;
    }

    public Integer getIdDanhGia() {
        return idDanhGia;
    }

    public void setIdDanhGia(Integer idDanhGia) {
        this.idDanhGia = idDanhGia;
    }

    public DanhGiaSanPham getDanhGiaSanPham() {
        return danhGiaSanPham;
    }

    public void setDanhGiaSanPham(DanhGiaSanPham danhGiaSanPham) {
        this.danhGiaSanPham = danhGiaSanPham;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}