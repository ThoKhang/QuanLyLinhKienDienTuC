package com.webnc.dto;
import lombok.Data;

@Data
public class DatHangRequest {
    private String diaChiGiaoHang;
    private String phuongThucThanhToan; // "TIEN_MAT" hoặc "QR_CODE"
    private String ghiChu;
}