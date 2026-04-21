package com.webnc.repository;

import com.webnc.entity.DanhGiaSanPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DanhGiaRepository extends JpaRepository<DanhGiaSanPham, Long> {
    
    // Lấy toàn bộ đánh giá của 1 sản phẩm (Để hiển thị ra màn hình chi tiết sản phẩm)
    List<DanhGiaSanPham> findBySanPham_IdOrderByNgayTaoDesc(Long sanPhamId);

    // Kiểm tra xem user này đã đánh giá sản phẩm này trong đơn hàng này chưa
    boolean existsByNguoiDung_IdAndSanPham_IdAndDonHang_Id(Long userId, Long sanPhamId, Long donHangId);
}