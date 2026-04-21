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

    @GetMapping
    public ResponseEntity<List<GioHang>> xemGioHang(Principal principal) {
        String tenDangNhap = principal.getName();
        return ResponseEntity.ok(gioHangService.xemGioHang(tenDangNhap));
    }

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

    // Đã sửa lại đường dẫn, loại bỏ chữ /api/gio-hang bị lặp
    @PutMapping("/cap-nhat/{id}")
    public ResponseEntity<?> capNhatSoLuong(@PathVariable Long id, @RequestParam Integer soLuong) {
        try {
            gioHangService.capNhatSoLuong(id, soLuong);
            return ResponseEntity.ok("Cập nhật số lượng thành công");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/xoa/{cartItemId}")
    public ResponseEntity<?> xoaKhoiGio(@PathVariable Long cartItemId) {
        gioHangService.xoaKhoiGio(cartItemId);
        return ResponseEntity.ok("Đã xóa sản phẩm khỏi giỏ hàng");
    }
}