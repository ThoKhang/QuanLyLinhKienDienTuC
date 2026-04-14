package com.webnc.entity;

import java.util.List;

public class Tinh {

    private String idTinh;

    private String tenTinh;

    // Quan hệ 1-N: Một Tỉnh/Thành phố có nhiều Xã/Phường
    private List<XaPhuong> xaPhuongs;

    // 1. Constructor không tham số
    public Tinh() {
    }

    // 2. Constructor đầy đủ tham số
    public Tinh(String idTinh, String tenTinh, List<XaPhuong> xaPhuongs) {
        this.idTinh = idTinh;
        this.tenTinh = tenTinh;
        this.xaPhuongs = xaPhuongs;
    }

    // 3. Getter và Setter
    public String getIdTinh() {
        return idTinh;
    }

    public void setIdTinh(String idTinh) {
        this.idTinh = idTinh;
    }

    public String getTenTinh() {
        return tenTinh;
    }

    public void setTenTinh(String tenTinh) {
        this.tenTinh = tenTinh;
    }

    public List<XaPhuong> getXaPhuongs() {
        return xaPhuongs;
    }

    public void setXaPhuongs(List<XaPhuong> xaPhuongs) {
        this.xaPhuongs = xaPhuongs;
    }
}