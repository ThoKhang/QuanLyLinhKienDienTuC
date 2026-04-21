package com.webnc.dto;

import lombok.Data;

@Data
public class DanhGiaRequest {
    private Long donHangId;
    private Long sanPhamId;
    private Integer soSao; // Từ 1 đến 5
    private String noiDung;
}