package com.webnc.dto;

import lombok.Data;

@Data
public class DatHangRequest {
    private String diaChiGiaoHang;
    private String phuongThucThanhToan; // Ví dụ: "COD" hoặc "VNPAY"
    private String ghiChu;
}