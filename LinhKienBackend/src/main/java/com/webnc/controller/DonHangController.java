package com.webnc.controller;

import com.webnc.dto.DatHangRequest;
import com.webnc.entity.ChiTietDonHang;
import com.webnc.entity.DonHang;
import com.webnc.service.DonHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/don-hang")
@CrossOrigin("*")
public class DonHangController {

    @Autowired
    private DonHangService donHangService;
    @Autowired
    private com.webnc.repository.DonHangRepository donHangRepository;
    @Autowired
    private com.webnc.repository.ChiTietDonHangRepository chiTietRepository;
    // Đường dẫn thực tế sẽ là: /api/don-hang/thanh-toan
    @PostMapping("/thanh-toan")
    public ResponseEntity<?> thanhToan(Principal principal, @RequestBody DatHangRequest request) {
        try {
            return ResponseEntity.ok(donHangService.datHang(principal.getName(), request));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Bổ sung API này vào dưới hàm datHang
    @GetMapping("/lich-su")
    public ResponseEntity<?> layLichSuDonHang(Principal principal) {
        try {
            String tenDangNhap = principal.getName();
            // Lấy đơn hàng và sắp xếp mới nhất lên đầu
            List<DonHang> danhSach = donHangRepository.findByNguoiDung_TenDangNhapOrderByNgayDatDesc(tenDangNhap);
            return ResponseEntity.ok(danhSach);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi lấy lịch sử đơn hàng");
        }
    }
    // 1. API lấy toàn bộ đơn hàng cho Admin
    @GetMapping("/admin/tat-ca")
    public ResponseEntity<?> layTatCaDonHangAdmin() {
        try {
            // Lấy tất cả và sắp xếp mới nhất lên đầu
            return ResponseEntity.ok(donHangRepository.findAll(org.springframework.data.domain.Sort.by(org.springframework.data.domain.Sort.Direction.DESC, "ngayDat")));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi lấy danh sách đơn hàng");
        }
    }

    // 2. API Cập nhật trạng thái đơn hàng
    @PutMapping("/admin/cap-nhat-trang-thai/{id}")
    public ResponseEntity<?> capNhatTrangThai(@PathVariable Long id, @RequestParam String trangThaiMoi) {
        try {
            DonHang donHang = donHangRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng"));

            donHang.setTrangThaiDon(trangThaiMoi);
            donHangRepository.save(donHang);
            return ResponseEntity.ok("Cập nhật trạng thái thành công!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/chi-tiet/{id}")
    public ResponseEntity<?> layChiTietDonHang(@PathVariable Long id) {
        try {
            DonHang donHang = donHangRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng"));

            // Lấy danh sách sản phẩm thuộc đơn hàng này
            List<ChiTietDonHang> chiTiets = chiTietRepository.findByDonHang_Id(id);

            // Trả về một Map chứa cả thông tin Đơn hàng và danh sách Sản phẩm
            Map<String, Object> response = new HashMap<>();
            response.put("donHang", donHang);
            response.put("sanPhams", chiTiets);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}