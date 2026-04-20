package com.webnc.service;

import com.webnc.dto.AuthRequest;
import com.webnc.entity.NguoiDung;
import com.webnc.repository.NguoiDungRepository;
import com.webnc.until.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private NguoiDungRepository nguoiDungRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // Logic Đăng Ký
    public String register(AuthRequest request) {
        if (nguoiDungRepository.existsByTenDangNhap(request.getTenDangNhap())) {
            throw new RuntimeException("Tên đăng nhập đã tồn tại!");
        }
        if (nguoiDungRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email đã được sử dụng!");
        }

        NguoiDung newUser = new NguoiDung();
        newUser.setTenDangNhap(request.getTenDangNhap());
        newUser.setHoTen(request.getHoTen());
        newUser.setEmail(request.getEmail());
        
        // Băm mật khẩu trước khi lưu vào CSDL
        String hashedPass = passwordEncoder.encode(request.getMatKhau());
        newUser.setMatKhau(hashedPass);
        
        // Mặc định tài khoản mới tạo là USER
        newUser.setVaiTro("USER"); 

        nguoiDungRepository.save(newUser);
        return "Đăng ký thành công!";
    }

    // Logic Đăng Nhập
    public String login(AuthRequest request) {
        Optional<NguoiDung> userOpt = nguoiDungRepository.findByTenDangNhap(request.getTenDangNhap());

        if (userOpt.isEmpty()) {
            throw new RuntimeException("Tài khoản không tồn tại!");
        }

        NguoiDung user = userOpt.get();

        // So sánh mật khẩu gốc React gửi lên với mật khẩu đã băm trong SQL
        if (!passwordEncoder.matches(request.getMatKhau(), user.getMatKhau())) {
            throw new RuntimeException("Sai mật khẩu!");
        }

        // Nếu đúng mật khẩu -> Cấp phát Token có chứa Role (USER hoặc ADMIN)
        return jwtUtil.generateToken(user.getTenDangNhap(), user.getVaiTro());
    }
}