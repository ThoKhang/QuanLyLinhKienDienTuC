package com.webnc.controller;

import com.webnc.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("*")
public class AdminController {

    @Autowired private NguoiDungService nguoiDungService;
    @Autowired private DanhGiaService danhGiaService;
    @Autowired private DoiTraService doiTraService;

    // --- QUẢN LÝ TÀI KHOẢN ---
    @GetMapping("/tai-khoan")
    public ResponseEntity<?> getAllAccounts() {
        return ResponseEntity.ok(nguoiDungService.layTatCa());
    }

    @PutMapping("/tai-khoan/{id}/trang-thai")
    public ResponseEntity<?> toggleStatus(@PathVariable Long id) {
        nguoiDungService.doiTrangThai(id);
        return ResponseEntity.ok("Thành công");
    }

    // --- QUẢN LÝ BÌNH LUẬN ---
    @GetMapping("/danh-gia")
    public ResponseEntity<?> getAllComments() {
        return ResponseEntity.ok(danhGiaService.layTatCaDanhGia());
    }

    @DeleteMapping("/danh-gia/{id}")
    public ResponseEntity<?> deleteComment(@PathVariable Long id) {
        danhGiaService.xoaDanhGia(id);
        return ResponseEntity.ok("Đã xóa");
    }

    // --- QUẢN LÝ ĐỔI TRẢ ---
    @GetMapping("/doi-tra")
    public ResponseEntity<?> getAllReturns() {
        return ResponseEntity.ok(doiTraService.layTatCaYeuCau());
    }

    // Khớp với logic: ?trangThai=... trong AdminReturn.jsx
    @PutMapping("/doi-tra/{id}")
    public ResponseEntity<?> updateReturnStatus(@PathVariable Long id, @RequestParam String trangThai) {
        // Mượn hàm xuLyYeuCau có sẵn của Khang, truyền mặc định tiền hoàn = 0 nếu chưa rõ
        doiTraService.xuLyYeuCau(id, trangThai, 0.0, "Cập nhật từ Admin");
        return ResponseEntity.ok("Thành công");
    }
}