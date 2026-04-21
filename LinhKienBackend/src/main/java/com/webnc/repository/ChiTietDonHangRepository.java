package com.webnc.repository;

import com.webnc.entity.ChiTietDonHang;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChiTietDonHangRepository extends JpaRepository<ChiTietDonHang, Long> {
    // Lấy các món hàng bên trong 1 đơn hàng cụ thể
    List<ChiTietDonHang> findByDonHang_Id(Long donHangId);
}