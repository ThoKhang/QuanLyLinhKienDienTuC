package com.webnc.controller;

import com.webnc.dto.DatHangRequest;
import com.webnc.service.DonHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/don-hang")
@CrossOrigin("*")
public class DonHangController {

    @Autowired
    private DonHangService donHangService;

    @PostMapping("/dat-hang")
    public ResponseEntity<?> datHang(Principal principal, @RequestBody DatHangRequest request) {
        try {
            String tenDangNhap = principal.getName();
            String message = donHangService.datHang(tenDangNhap, request);
            return ResponseEntity.ok(message);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}