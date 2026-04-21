package com.webnc.controller;

import com.webnc.entity.SanPham;
import com.webnc.service.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
// Tạm mở CORS cho mọi Frontend React gọi tới
@CrossOrigin(origins = "*") 
public class SanPhamController {

    @Autowired
    private SanPhamService sanPhamService;
    
    // ==========================================
    // API PUBLIC (Ai cũng xem được, không cần Token)
    // ==========================================
    @GetMapping("/api/public/san-pham")
    public ResponseEntity<List<SanPham>> layDanhSachSanPham() {
        return ResponseEntity.ok(sanPhamService.layTatCaSanPham());
    }

    // ==========================================
    // API ADMIN (Bắt buộc phải có JWT Token của Admin)
    // ==========================================
    
    // Lưu ý: data gửi từ React lên sẽ có thêm trường danhMucId
    @PostMapping("/api/admin/san-pham")
    public ResponseEntity<?> themSanPham(@RequestBody SanPham sanPham, @RequestParam Long danhMucId) {
        try {
            SanPham spMoi = sanPhamService.themSanPham(sanPham, danhMucId);
            return ResponseEntity.ok(spMoi);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    // Thêm hàm này vào dưới hàm layDanhSachSanPham
    @GetMapping("/api/public/san-pham/{id}")
    public ResponseEntity<?> layChiTietSanPham(@PathVariable Long id) {
        try {
            // Bạn hãy kiểm tra xem trong SanPhamService đã có hàm tìm theo ID chưa
            // Nếu chưa có, tôi sẽ hướng dẫn viết ở bước dưới
            SanPham sp = sanPhamService.laySanPhamTheoId(id);
            return ResponseEntity.ok(sp);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body("Không tìm thấy sản phẩm với ID: " + id);
        }
    }
    
    @DeleteMapping("/api/admin/san-pham/{id}")
    public ResponseEntity<?> xoaSanPham(@PathVariable Long id) {
        try {
            sanPhamService.xoaSanPham(id);
            return ResponseEntity.ok("Đã xóa sản phẩm thành công!");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}