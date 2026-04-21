package com.webnc.service;

import com.webnc.entity.GioHang;
import com.webnc.entity.NguoiDung;
import com.webnc.entity.SanPham;
import com.webnc.repository.GioHangRepository;
import com.webnc.repository.NguoiDungRepository;
import com.webnc.repository.SanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GioHangService {

    @Autowired
    private GioHangRepository gioHangRepository;
    @Autowired
    private SanPhamRepository sanPhamRepository;
    @Autowired
    private NguoiDungRepository nguoiDungRepository;

    // 1. Xem giỏ hàng
    public List<GioHang> xemGioHang(String tenDangNhap) {
        return gioHangRepository.findByNguoiDung_TenDangNhap(tenDangNhap);
    }

    // 2. Thêm vào giỏ hàng
    public GioHang themVaoGio(String tenDangNhap, Long sanPhamId, int soLuongThem) {
        // Tìm thông tin User và Sản phẩm
        NguoiDung user = nguoiDungRepository.findByTenDangNhap(tenDangNhap)
                .orElseThrow(() -> new RuntimeException("Lỗi: Không tìm thấy người dùng!"));
        SanPham sp = sanPhamRepository.findById(sanPhamId)
                .orElseThrow(() -> new RuntimeException("Lỗi: Sản phẩm không tồn tại!"));

        // Kiểm tra xem sản phẩm đã có trong giỏ chưa
        Optional<GioHang> itemCu = gioHangRepository.findByNguoiDung_TenDangNhapAndSanPham_Id(tenDangNhap, sanPhamId);
        
        GioHang cartItem;
        if (itemCu.isPresent()) {
            // Đã có -> Cộng dồn số lượng
            cartItem = itemCu.get();
            int tongSoLuong = cartItem.getSoLuong() + soLuongThem;
            
            // Kiểm tra tồn kho
            if (tongSoLuong > sp.getSoLuongTon()) {
                throw new RuntimeException("Không đủ hàng! Kho chỉ còn " + sp.getSoLuongTon() + " cái.");
            }
            cartItem.setSoLuong(tongSoLuong);
        } else {
            // Chưa có -> Tạo mới
            if (soLuongThem > sp.getSoLuongTon()) {
                throw new RuntimeException("Không đủ hàng! Kho chỉ còn " + sp.getSoLuongTon() + " cái.");
            }
            cartItem = new GioHang();
            cartItem.setNguoiDung(user);
            cartItem.setSanPham(sp);
            cartItem.setSoLuong(soLuongThem);
        }

        return gioHangRepository.save(cartItem);
    }

    // 3. Xóa khỏi giỏ
    public void xoaKhoiGio(Long cartItemId) {
        gioHangRepository.deleteById(cartItemId);
    }
}