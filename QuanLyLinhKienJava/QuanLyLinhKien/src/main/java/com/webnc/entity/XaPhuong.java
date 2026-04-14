package com.webnc.entity;

public class XaPhuong {

    private String idXaPhuong;

    private String idTinh;

    // Quan hệ N-1: Nhiều Xã/Phường thuộc về một Tỉnh/Thành phố
    private Tinh tinh;

    private String tenXaPhuong;

    // 1. Constructor không tham số
    public XaPhuong() {
    }

    // 2. Constructor đầy đủ tham số
    public XaPhuong(String idXaPhuong, String idTinh, Tinh tinh, String tenXaPhuong) {
        this.idXaPhuong = idXaPhuong;
        this.idTinh = idTinh;
        this.tinh = tinh;
        this.tenXaPhuong = tenXaPhuong;
    }

    // 3. Getter và Setter
    public String getIdXaPhuong() {
        return idXaPhuong;
    }

    public void setIdXaPhuong(String idXaPhuong) {
        this.idXaPhuong = idXaPhuong;
    }

    public String getIdTinh() {
        return idTinh;
    }

    public void setIdTinh(String idTinh) {
        this.idTinh = idTinh;
    }

    public Tinh getTinh() {
        return tinh;
    }

    public void setTinh(Tinh tinh) {
        this.tinh = tinh;
    }

    public String getTenXaPhuong() {
        return tenXaPhuong;
    }

    public void setTenXaPhuong(String tenXaPhuong) {
        this.tenXaPhuong = tenXaPhuong;
    }
}