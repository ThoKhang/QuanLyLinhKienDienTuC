package com.webnc.controller;

import com.webnc.entity.NguoiDung;
import com.webnc.repository.NguoiDungRepository;
import java.security.Principal;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder; // Thêm cái này
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin("*")
public class UserController {

    @Autowired private NguoiDungRepository repository;
    
    // Cần PasswordEncoder để check và mã hóa mật khẩu
    @Autowired private PasswordEncoder passwordEncoder;

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Principal principal) {
        // Nên dùng orElseThrow thay vì .get() để tránh lỗi nếu không tìm thấy user
        NguoiDung user = repository.findByTenDangNhap(principal.getName())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy thông tin người dùng"));
        return ResponseEntity.ok(user);
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(Principal principal, @RequestBody NguoiDung userCapNhat) {
        try {
            NguoiDung userHienTai = repository.findByTenDangNhap(principal.getName())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));

            if (!userHienTai.getEmail().equals(userCapNhat.getEmail()) && 
                repository.existsByEmail(userCapNhat.getEmail())) {
                throw new RuntimeException("Email này đã được sử dụng bởi tài khoản khác!");
            }

            userHienTai.setHoTen(userCapNhat.getHoTen());
            userHienTai.setEmail(userCapNhat.getEmail());
            userHienTai.setSoDienThoai(userCapNhat.getSoDienThoai());
            userHienTai.setDiaChi(userCapNhat.getDiaChi());

            repository.save(userHienTai);
            return ResponseEntity.ok("Cập nhật thông tin thành công!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(Principal principal, @RequestBody Map<String, String> request) {
        try {
            NguoiDung user = repository.findByTenDangNhap(principal.getName())
                    .orElseThrow(() -> new RuntimeException("Người dùng không tồn tại"));

            String oldPw = request.get("oldPassword");
            String newPw = request.get("newPassword");

            // 1. Kiểm tra mật khẩu cũ (Dùng matches của PasswordEncoder)
            if (!passwordEncoder.matches(oldPw, user.getMatKhau())) {
                return ResponseEntity.badRequest().body("Mật khẩu hiện tại không chính xác!");
            }

            // 2. Mã hóa mật khẩu mới trước khi lưu
            user.setMatKhau(passwordEncoder.encode(newPw));
            
            repository.save(user);
            return ResponseEntity.ok("Đổi mật khẩu thành công!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi: " + e.getMessage());
        }
    }
}