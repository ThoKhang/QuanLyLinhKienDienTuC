package com.webnc.repository;

import com.webnc.entity.DonHang;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DonHangRepository extends JpaRepository<DonHang, Long> {
    List<DonHang> findByNguoiDung_TenDangNhap(String tenDangNhap); // Dùng để xem lịch sử mua hàng
    // Lấy danh sách đơn hàng của User (dùng cho trang MyOrders) - Sắp xếp đơn mới nhất lên đầu
    List<DonHang> findByNguoiDung_TenDangNhapOrderByNgayDatDesc(String tenDangNhap);
}