package com.webnc.controller;

import com.webnc.entity.DanhGiaSanPham;
import com.webnc.entity.DonHang;
import com.webnc.entity.NguoiDung;
import com.webnc.entity.SanPham;
import com.webnc.repository.DanhGiaRepository;
import com.webnc.repository.DonHangRepository;
import com.webnc.repository.NguoiDungRepository;
import com.webnc.repository.SanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api") // TRẢ VỀ BASE URL GỐC
@CrossOrigin("*")
public class DanhGiaController {

    @Autowired private DanhGiaRepository danhGiaRepository;
    @Autowired private DonHangRepository donHangRepository;
    @Autowired private SanPhamRepository sanPhamRepository;
    @Autowired private NguoiDungRepository nguoiDungRepository;

    // ===============================================
    // API PUBLIC: Ai cũng xem được đánh giá (Không cần đăng nhập)
    // ===============================================
    @GetMapping("/public/danh-gia/{sanPhamId}")
    public ResponseEntity<List<DanhGiaSanPham>> layDanhGiaSanPham(@PathVariable Long sanPhamId) {
        return ResponseEntity.ok(danhGiaRepository.findBySanPham_IdOrderByNgayTaoDesc(sanPhamId));
    }

    // ===============================================
    // API BẢO MẬT: Bắt buộc đăng nhập mới được đánh giá
    // ===============================================
    @PostMapping("/danh-gia/them")
    public ResponseEntity<?> themDanhGia(Principal principal, @RequestBody Map<String, Object> request) {
        try {
            NguoiDung user = nguoiDungRepository.findByTenDangNhap(principal.getName()).orElseThrow();
            DonHang donHang = donHangRepository.findById(Long.valueOf(request.get("donHangId").toString())).orElseThrow();
            SanPham sanPham = sanPhamRepository.findById(Long.valueOf(request.get("sanPhamId").toString())).orElseThrow();
        
            DanhGiaSanPham danhGia = new DanhGiaSanPham();
            danhGia.setNguoiDung(user);
            danhGia.setDonHang(donHang);
            danhGia.setSanPham(sanPham);
            danhGia.setSoSao(Integer.parseInt(request.get("soSao").toString()));
            danhGia.setNoiDung(request.get("noiDung").toString());
            
            // Xử lý lưu hình ảnh
            if (request.containsKey("hinhAnh") && request.get("hinhAnh") != null) {
                danhGia.setHinhAnh(request.get("hinhAnh").toString());
            }

            danhGiaRepository.save(danhGia);
            return ResponseEntity.ok("Đã lưu đánh giá thành công!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi: " + e.getMessage());
        }
    }
}