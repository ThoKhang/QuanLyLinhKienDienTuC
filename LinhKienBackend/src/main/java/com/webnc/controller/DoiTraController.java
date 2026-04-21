package com.webnc.controller;

import com.webnc.entity.DonHang;
import com.webnc.entity.NguoiDung;
import com.webnc.entity.YeuCauDoiTra;
import com.webnc.repository.DonHangRepository;
import com.webnc.repository.NguoiDungRepository;
import com.webnc.repository.YeuCauDoiTraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api/doi-tra") // ĐÃ SỬA LẠI ĐƯỜNG DẪN GỐC Ở ĐÂY
@CrossOrigin("*")
public class DoiTraController {

    @Autowired private YeuCauDoiTraRepository yeuCauRepository;
    @Autowired private DonHangRepository donHangRepository;
    @Autowired private NguoiDungRepository nguoiDungRepository;

    // ==========================================
    // API KHÁCH HÀNG
    // ==========================================
    
    @PostMapping("/gui-yeu-cau")
    public ResponseEntity<?> guiYeuCau(Principal principal, @RequestBody Map<String, Object> request) {
        try {
            NguoiDung user = nguoiDungRepository.findByTenDangNhap(principal.getName()).orElseThrow();
            DonHang donHang = donHangRepository.findById(Long.valueOf(request.get("donHangId").toString())).orElseThrow();

            YeuCauDoiTra yeuCau = new YeuCauDoiTra();
            yeuCau.setNguoiDung(user);
            yeuCau.setDonHang(donHang);
            yeuCau.setLyDo(request.get("lyDo").toString());
            yeuCau.setChiTiet(request.get("chiTiet").toString());
            yeuCau.setTrangThai("CHO_XU_LY"); 
            
            if (request.containsKey("hinhAnh") && request.get("hinhAnh") != null) {
                yeuCau.setHinhAnh(request.get("hinhAnh").toString());
            }

            yeuCauRepository.save(yeuCau);
            return ResponseEntity.ok("Gửi yêu cầu đổi trả thành công!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi: " + e.getMessage());
        }
    }

    @GetMapping("/lich-su")
    public ResponseEntity<?> lichSuDoiTra(Principal principal) {
        String tenDangNhap = principal.getName();
        return ResponseEntity.ok(yeuCauRepository.findByNguoiDung_TenDangNhapOrderByNgayTaoDesc(tenDangNhap));
    }

    // ==========================================
    // API ADMIN 
    // ==========================================
    
    @GetMapping("/admin/tat-ca")
    public ResponseEntity<?> layTatCaYeuCau() {
        return ResponseEntity.ok(yeuCauRepository.findAllByOrderByNgayTaoDesc());
    }

    @PutMapping("/admin/cap-nhat-trang-thai/{id}")
    public ResponseEntity<?> capNhatTrangThaiAdmin(@PathVariable Long id, @RequestParam String trangThaiMoi) {
        try {
            YeuCauDoiTra yeuCau = yeuCauRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy yêu cầu"));
            yeuCau.setTrangThai(trangThaiMoi);
            yeuCauRepository.save(yeuCau);
            return ResponseEntity.ok("Cập nhật thành công");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}