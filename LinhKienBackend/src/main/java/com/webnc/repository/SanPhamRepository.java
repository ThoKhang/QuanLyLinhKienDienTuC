package com.webnc.repository;

import com.webnc.entity.DanhMuc;
import com.webnc.entity.SanPham;
import org.springframework.data.jpa.repository.JpaRepository;


public interface SanPhamRepository extends JpaRepository<SanPham, Long> {
    // Spring Boot đủ thông minh để tự gen câu query tìm kiếm theo tên
    boolean existsByMaSanPham(String maSanPham);
}