package com.webnc.entity;

import java.util.List;

public class CongTy {

    // Tương đương [Key] trong C#
    private String idCongTy;

    // Tương đương [Required] trong C#
    private String tenCongTy;

    // Quan hệ 1-N: Một công ty có nhiều sản phẩm
    private List<SanPham> sanPhams;

    // 1. Constructor không tham số
    public CongTy() {
    }

    // 2. Constructor đầy đủ tham số
    public CongTy(String idCongTy, String tenCongTy, List<SanPham> sanPhams) {
        this.idCongTy = idCongTy;
        this.tenCongTy = tenCongTy;
        this.sanPhams = sanPhams;
    }

    // 3. Getter và Setter
    public String getIdCongTy() {
        return idCongTy;
    }

    public void setIdCongTy(String idCongTy) {
        this.idCongTy = idCongTy;
    }

    public String getTenCongTy() {
        return tenCongTy;
    }

    public void setTenCongTy(String tenCongTy) {
        this.tenCongTy = tenCongTy;
    }

    public List<SanPham> getSanPhams() {
        return sanPhams;
    }

    public void setSanPhams(List<SanPham> sanPhams) {
        this.sanPhams = sanPhams;
    }
}