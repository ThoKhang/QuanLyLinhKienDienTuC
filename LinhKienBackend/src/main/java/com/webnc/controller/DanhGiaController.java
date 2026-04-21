package com.webnc.controller;

import com.webnc.dto.DanhGiaRequest;
import com.webnc.entity.DanhGiaSanPham;
import com.webnc.service.DanhGiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class DanhGiaController {

    @Autowired
    private DanhGiaService danhGiaService;

    // API PUBLIC: Xem danh sách đánh giá của 1 sản phẩm (Không cần Token)
    @GetMapping("/public/danh-gia/{sanPhamId}")
    public ResponseEntity<List<DanhGiaSanPham>> layDanhGiaSanPham(@PathVariable Long sanPhamId) {
        return ResponseEntity.ok(danhGiaService.xemDanhGiaSanPham(sanPhamId));
    }

    // API BẢO MẬT: Khách hàng đăng đánh giá (Bắt buộc có Token)
    @PostMapping("/danh-gia")
    public ResponseEntity<?> themDanhGia(Principal principal, @RequestBody DanhGiaRequest request) {
        try {
            String tenDangNhap = principal.getName();
            DanhGiaSanPham ketQua = danhGiaService.themDanhGia(tenDangNhap, request);
            return ResponseEntity.ok(ketQua);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}