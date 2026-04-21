package com.webnc.controller;

import com.webnc.entity.GioHang;
import com.webnc.service.GioHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/gio-hang")
@CrossOrigin("*")
public class GioHangController {

    @Autowired
    private GioHangService gioHangService;

    // API Xem giỏ hàng cá nhân (Bắt buộc có Token)
    @GetMapping
    public ResponseEntity<List<GioHang>> xemGioHang(Principal principal) {
        // principal.getName() chính là tenDangNhap được giải mã từ Token
        String tenDangNhap = principal.getName();
        return ResponseEntity.ok(gioHangService.xemGioHang(tenDangNhap));
    }

    // API Thêm sản phẩm vào giỏ
    @PostMapping("/them")
    public ResponseEntity<?> themVaoGio(Principal principal, 
                                        @RequestParam Long sanPhamId, 
                                        @RequestParam int soLuong) {
        try {
            String tenDangNhap = principal.getName();
            GioHang item = gioHangService.themVaoGio(tenDangNhap, sanPhamId, soLuong);
            return ResponseEntity.ok(item);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // API Xóa 1 món khỏi giỏ
    @DeleteMapping("/xoa/{cartItemId}")
    public ResponseEntity<?> xoaKhoiGio(@PathVariable Long cartItemId) {
        gioHangService.xoaKhoiGio(cartItemId);
        return ResponseEntity.ok("Đã xóa sản phẩm khỏi giỏ hàng");
    }
}