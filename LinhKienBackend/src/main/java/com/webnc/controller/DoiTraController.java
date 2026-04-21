package com.webnc.controller;

import com.webnc.dto.DoiTraRequest;
import com.webnc.entity.YeuCauDoiTra;
import com.webnc.service.DoiTraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class DoiTraController {

    @Autowired
    private DoiTraService doiTraService;

    // ==========================================
    // API KHÁCH HÀNG (Yêu cầu Token)
    // ==========================================
    @PostMapping("/doi-tra/gui-yeu-cau")
    public ResponseEntity<?> guiYeuCau(Principal principal, @RequestBody DoiTraRequest request) {
        try {
            String tenDangNhap = principal.getName();
            YeuCauDoiTra ketQua = doiTraService.taoYeuCau(tenDangNhap, request);
            return ResponseEntity.ok(ketQua);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ==========================================
    // API ADMIN (Bắt buộc Token ADMIN)
    // ==========================================
    @PutMapping("/admin/doi-tra/{yeuCauId}/xu-ly")
    public ResponseEntity<?> adminXuLy(
            @PathVariable Long yeuCauId,
            @RequestParam String trangThai,
            @RequestParam Double soTienHoan,
            @RequestParam(required = false) String ghiChuAdmin) {
        try {
            YeuCauDoiTra ketQua = doiTraService.xuLyYeuCau(yeuCauId, trangThai, soTienHoan, ghiChuAdmin);
            return ResponseEntity.ok(ketQua);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}