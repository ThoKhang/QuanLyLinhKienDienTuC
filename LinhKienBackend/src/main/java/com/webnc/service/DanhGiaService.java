package com.webnc.service;

import com.webnc.dto.DanhGiaRequest;
import com.webnc.entity.*;
import com.webnc.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DanhGiaService {

    @Autowired private DanhGiaRepository danhGiaRepository;
    @Autowired private NguoiDungRepository nguoiDungRepository;
    @Autowired private SanPhamRepository sanPhamRepository;
    @Autowired private DonHangRepository donHangRepository;
    @Autowired private ChiTietDonHangRepository chiTietDonHangRepository;

    public DanhGiaSanPham themDanhGia(String tenDangNhap, DanhGiaRequest request) {
        // 1. Kiểm tra số sao hợp lệ
        if (request.getSoSao() < 1 || request.getSoSao() > 5) {
            throw new RuntimeException("Số sao phải từ 1 đến 5!");
        }

        NguoiDung user = nguoiDungRepository.findByTenDangNhap(tenDangNhap)
                .orElseThrow(() -> new RuntimeException("Người dùng không tồn tại"));

        DonHang donHang = donHangRepository.findById(request.getDonHangId())
                .orElseThrow(() -> new RuntimeException("Đơn hàng không tồn tại"));

        // 2. Kiểm tra đơn hàng có phải của user đang đăng nhập không
        if (!donHang.getNguoiDung().getId().equals(user.getId())) {
            throw new RuntimeException("Bạn không có quyền đánh giá đơn hàng của người khác!");
        }

        // 3. Kiểm tra user có thực sự mua sản phẩm này trong đơn hàng không
        // (Đây là hàm tự tạo thủ công thay vì viết query rườm rà)
        boolean daMuaKiemTra = false;
        List<ChiTietDonHang> chiTietList = chiTietDonHangRepository.findAll(); 
        for (ChiTietDonHang ct : chiTietList) {
            if (ct.getDonHang().getId().equals(donHang.getId()) && 
                ct.getSanPham().getId().equals(request.getSanPhamId())) {
                daMuaKiemTra = true;
                break;
            }
        }
        if (!daMuaKiemTra) {
            throw new RuntimeException("Bạn chưa mua sản phẩm này trong đơn hàng chỉ định!");
        }

        // 4. Kiểm tra chống Spam (1 sản phẩm trong 1 đơn chỉ đánh giá 1 lần)
        if (danhGiaRepository.existsByNguoiDung_IdAndSanPham_IdAndDonHang_Id(
                user.getId(), request.getSanPhamId(), donHang.getId())) {
            throw new RuntimeException("Bạn đã đánh giá sản phẩm này rồi!");
        }

        SanPham sanPham = sanPhamRepository.findById(request.getSanPhamId()).get();

        // 5. Lưu đánh giá
        DanhGiaSanPham danhGia = new DanhGiaSanPham();
        danhGia.setNguoiDung(user);
        danhGia.setSanPham(sanPham);
        danhGia.setDonHang(donHang);
        danhGia.setSoSao(request.getSoSao());
        danhGia.setNoiDung(request.getNoiDung());

        return danhGiaRepository.save(danhGia);
    }

    // Lấy danh sách đánh giá công khai cho ai cũng xem được
    public List<DanhGiaSanPham> xemDanhGiaSanPham(Long sanPhamId) {
        return danhGiaRepository.findBySanPham_IdOrderByNgayTaoDesc(sanPhamId);
    }
}