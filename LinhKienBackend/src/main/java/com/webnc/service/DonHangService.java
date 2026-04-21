package com.webnc.service;

import com.webnc.dto.DatHangRequest;
import com.webnc.entity.ChiTietDonHang;
import com.webnc.entity.DonHang;
import com.webnc.entity.GioHang;
import com.webnc.entity.NguoiDung;
import com.webnc.entity.SanPham;
import com.webnc.repository.ChiTietDonHangRepository;
import com.webnc.repository.DonHangRepository;
import com.webnc.repository.GioHangRepository;
import com.webnc.repository.NguoiDungRepository;
import com.webnc.repository.SanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DonHangService {

    @Autowired private DonHangRepository donHangRepository;
    @Autowired private ChiTietDonHangRepository chiTietDonHangRepository;
    @Autowired private GioHangRepository gioHangRepository;
    @Autowired private NguoiDungRepository nguoiDungRepository;
    @Autowired private SanPhamRepository sanPhamRepository;

    @Transactional
    public DonHang datHang(String tenDangNhap, DatHangRequest request) {
        NguoiDung user = nguoiDungRepository.findByTenDangNhap(tenDangNhap)
                .orElseThrow(() -> new RuntimeException("Lỗi user"));

        List<GioHang> dsGioHang = gioHangRepository.findByNguoiDung_Id(user.getId());
        if (dsGioHang.isEmpty()) throw new RuntimeException("Giỏ hàng trống!");

        // BƯỚC 1: Tính toán tổng tiền trước
        double tongTien = 0;
        for (GioHang item : dsGioHang) {
            tongTien += (item.getSanPham().getGiaBan() * item.getSoLuong());
        }

        // BƯỚC 2: Tạo đơn hàng với đầy đủ thông tin (bao gồm tổng tiền)
        DonHang donHang = new DonHang();
        donHang.setNguoiDung(user);
        donHang.setTongTien(tongTien); // THIẾT LẬP TỔNG TIỀN Ở ĐÂY
        donHang.setDiaChiGiaoHang(request.getDiaChiGiaoHang());
        donHang.setPhuongThucThanhToan(request.getPhuongThucThanhToan());
        donHang.setGhiChu(request.getGhiChu());
        donHang.setTrangThaiDon("CHO_XAC_NHAN");
        donHang.setTrangThaiThanhToan(request.getPhuongThucThanhToan().equals("QR_CODE") ? "DA_THANH_TOAN" : "CHUA_THANH_TOAN");

        // Bây giờ lưu sẽ không bị lỗi "not-null" nữa
        donHang = donHangRepository.save(donHang);

        // BƯỚC 3: Lưu chi tiết đơn hàng và trừ kho
        for (GioHang item : dsGioHang) {
            SanPham sp = item.getSanPham();
            if (sp.getSoLuongTon() < item.getSoLuong()) {
                throw new RuntimeException("Sản phẩm " + sp.getTenSanPham() + " không đủ số lượng!");
            }

            sp.setSoLuongTon(sp.getSoLuongTon() - item.getSoLuong());
            sanPhamRepository.save(sp);

            ChiTietDonHang chiTiet = new ChiTietDonHang();
            chiTiet.setDonHang(donHang);
            chiTiet.setSanPham(sp);
            chiTiet.setSoLuong(item.getSoLuong());
            chiTiet.setDonGia(sp.getGiaBan());
            chiTietDonHangRepository.save(chiTiet);
        }

        gioHangRepository.deleteAll(dsGioHang);
        return donHang;
    }
    
}