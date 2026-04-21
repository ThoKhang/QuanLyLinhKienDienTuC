package com.webnc.repository;

import com.webnc.entity.YeuCauDoiTra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface YeuCauDoiTraRepository extends JpaRepository<YeuCauDoiTra, Long> {
    
    // Lấy danh sách yêu cầu của một khách hàng cụ thể
    List<YeuCauDoiTra> findByNguoiDung_TenDangNhap(String tenDangNhap);
    // Khách hàng xem lịch sử đổi trả của chính mình (Trang MyReturns)
    List<YeuCauDoiTra> findByNguoiDung_TenDangNhapOrderByNgayTaoDesc(String tenDangNhap);
    // Kiểm tra xem đơn hàng này đã từng bị yêu cầu đổi trả chưa (1 đơn chỉ được claim 1 lần)
    boolean existsByDonHang_Id(Long donHangId);
    List<YeuCauDoiTra> findAllByOrderByNgayTaoDesc();
}