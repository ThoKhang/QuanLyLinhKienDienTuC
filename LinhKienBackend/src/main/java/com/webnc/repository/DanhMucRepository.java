package com.webnc.repository;

import com.webnc.entity.DanhMuc;
import com.webnc.entity.SanPham;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DanhMucRepository extends JpaRepository<DanhMuc, Long> {
}