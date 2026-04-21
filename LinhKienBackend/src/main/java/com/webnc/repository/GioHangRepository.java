package com.webnc.repository;

import com.webnc.entity.GioHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GioHangRepository extends JpaRepository<GioHang, Long> {
    
    // Lấy toàn bộ giỏ hàng dựa vào Tên đăng nhập
    List<GioHang> findByNguoiDung_TenDangNhap(String tenDangNhap);

    // Tìm xem 1 sản phẩm cụ thể đã nằm trong giỏ của user này chưa
    Optional<GioHang> findByNguoiDung_TenDangNhapAndSanPham_Id(String tenDangNhap, Long sanPhamId);
}