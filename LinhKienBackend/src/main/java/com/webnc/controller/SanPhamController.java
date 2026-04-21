package com.webnc.controller;

import com.webnc.entity.ChiTietLinhKien; // Bắt buộc phải import
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

    @GetMapping("/api/public/san-pham/{id}")
    public ResponseEntity<?> layChiTietSanPham(@PathVariable Long id) {
        try {
            SanPham sp = sanPhamService.laySanPhamTheoId(id);
            return ResponseEntity.ok(sp);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body("Không tìm thấy sản phẩm với ID: " + id);
        }
    }

    // ==========================================
    // API ADMIN (Bắt buộc phải có JWT Token của Admin)
    // ==========================================
    
    @PostMapping("/api/admin/san-pham")
    public ResponseEntity<?> themSanPham(@RequestBody SanPham sanPham, @RequestParam Long danhMucId) {
        try {
            // [QUAN TRỌNG]: Nối dây cha con trước khi lưu
            if (sanPham.getChiTietLinhKiens() != null) {
                for (ChiTietLinhKien ct : sanPham.getChiTietLinhKiens()) {
                    ct.setSanPham(sanPham); 
                }
            }
            SanPham spMoi = sanPhamService.themSanPham(sanPham, danhMucId);
            return ResponseEntity.ok(spMoi);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Bổ sung API cập nhật (sửa) sản phẩm
    @PutMapping("/api/admin/san-pham/{id}")
    public ResponseEntity<?> capNhatSanPham(@PathVariable Long id, @RequestBody SanPham sanPhamCapNhat) {
        try {
            // [QUAN TRỌNG]: Nối dây cha con trước khi lưu
            if (sanPhamCapNhat.getChiTietLinhKiens() != null) {
                for (ChiTietLinhKien ct : sanPhamCapNhat.getChiTietLinhKiens()) {
                    ct.setSanPham(sanPhamCapNhat);
                }
            }
            SanPham spDaSua = sanPhamService.capNhatSanPham(id, sanPhamCapNhat);
            return ResponseEntity.ok(spDaSua);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
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