package com.webnc.dto;

import lombok.Data;

@Data // Tự động sinh Getter/Setter nhờ Lombok
public class AuthRequest {
    private String tenDangNhap;
    private String matKhau;
    private String hoTen; // Chỉ dùng khi đăng ký
    private String email; // Chỉ dùng khi đăng ký
}