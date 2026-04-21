package com.webnc.controller;

import com.webnc.dto.AuthRequest;
import com.webnc.entity.NguoiDung;
import com.webnc.repository.NguoiDungRepository;
import com.webnc.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private AuthService authService;

    // Tiêm Repository vào để truy vấn thông tin user
    @Autowired
    private NguoiDungRepository nguoiDungRepository; 

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRequest request) {
        try {
            String message = authService.register(request);
            return ResponseEntity.ok(message);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        try {
            // 1. Vẫn gọi login để xác thực và lấy Token như cũ
            String token = authService.login(request);
            
            // 2. Tìm thông tin người dùng trong DB dựa vào tên đăng nhập
            NguoiDung user = nguoiDungRepository.findByTenDangNhap(request.getTenDangNhap())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng!"));

            // 3. Đóng gói Token + Tên + Vai Trò (từ DB) gửi về cho React
            Map<String, String> responseData = new HashMap<>();
            responseData.put("token", "Bearer " + token);
            responseData.put("username", user.getTenDangNhap());
            responseData.put("role", user.getVaiTro()); // LẤY CHUẨN TỪ DATABASE CỦA KHANG!
            
            return ResponseEntity.ok(responseData);
        } catch (RuntimeException e) {
            Map<String, String> errorData = new HashMap<>();
            errorData.put("message", e.getMessage());
            return ResponseEntity.status(401).body(errorData);
        }
    }
}