package com.webnc.repository;

import com.webnc.entity.NguoiDung;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NguoiDungRepository extends JpaRepository<NguoiDung, Long> {
    
    // Các hàm này sẽ được AuthService gọi đến để kiểm tra và đăng nhập
    Optional<NguoiDung> findByTenDangNhap(String tenDangNhap);
    
    boolean existsByTenDangNhap(String tenDangNhap);
    
    boolean existsByEmail(String email);
}