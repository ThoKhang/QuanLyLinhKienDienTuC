package com.webnc.service;

import com.webnc.dto.DatHangRequest;
import com.webnc.entity.*;
import com.webnc.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DonHangService {

    @Autowired private DonHangRepository donHangRepository;
    @Autowired private ChiTietDonHangRepository chiTietDonHangRepository;
    @Autowired private GioHangRepository gioHangRepository;
    @Autowired private SanPhamRepository sanPhamRepository;
    @Autowired private NguoiDungRepository nguoiDungRepository;

    @Transactional // Rất quan trọng!
    public String datHang(String tenDangNhap, DatHangRequest request) {
        
        // 1. Lấy giỏ hàng của user
        NguoiDung user = nguoiDungRepository.findByTenDangNhap(tenDangNhap)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));
        
        List<GioHang> danhSachGioHang = gioHangRepository.findByNguoiDung_TenDangNhap(tenDangNhap);
        if (danhSachGioHang.isEmpty()) {
            throw new RuntimeException("Giỏ hàng đang trống, không thể đặt hàng!");
        }

        // 2. Tính tổng tiền & Kiểm tra tồn kho lần cuối
        double tongTien = 0;
        for (GioHang item : danhSachGioHang) {
            SanPham sp = item.getSanPham();
            if (sp.getSoLuongTon() < item.getSoLuong()) {
                throw new RuntimeException("Sản phẩm " + sp.getTenSanPham() + " không đủ số lượng trong kho!");
            }
            tongTien += sp.getGiaBan() * item.getSoLuong();
        }

        // 3. Tạo Đơn hàng mới
        DonHang donHangMoi = new DonHang();
        donHangMoi.setNguoiDung(user);
        donHangMoi.setTongTien(tongTien);
        donHangMoi.setDiaChiGiaoHang(request.getDiaChiGiaoHang());
        donHangMoi.setPhuongThucThanhToan(request.getPhuongThucThanhToan());
        donHangMoi.setGhiChu(request.getGhiChu());
        DonHang donHangDaLuu = donHangRepository.save(donHangMoi);

        // 4. Lưu Chi tiết đơn hàng và Trừ tồn kho
        for (GioHang item : danhSachGioHang) {
            SanPham sp = item.getSanPham();

            ChiTietDonHang chiTiet = new ChiTietDonHang();
            chiTiet.setDonHang(donHangDaLuu);
            chiTiet.setSanPham(sp);
            chiTiet.setSoLuong(item.getSoLuong());
            chiTiet.setDonGia(sp.getGiaBan());
            chiTietDonHangRepository.save(chiTiet);

            // Trừ số lượng trong kho
            sp.setSoLuongTon(sp.getSoLuongTon() - item.getSoLuong());
            sanPhamRepository.save(sp);
        }

        // 5. Xóa sạch giỏ hàng sau khi đặt thành công
        gioHangRepository.deleteAll(danhSachGioHang);

        return "Đặt hàng thành công! Mã đơn hàng của bạn là: " + donHangDaLuu.getId();
    }
}