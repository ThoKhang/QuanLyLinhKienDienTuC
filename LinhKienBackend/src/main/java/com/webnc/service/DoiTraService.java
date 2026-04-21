package com.webnc.service;

import com.webnc.dto.DoiTraRequest;
import com.webnc.entity.DonHang;
import com.webnc.entity.NguoiDung;
import com.webnc.entity.YeuCauDoiTra;
import com.webnc.repository.DonHangRepository;
import com.webnc.repository.NguoiDungRepository;
import com.webnc.repository.YeuCauDoiTraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class DoiTraService {

    @Autowired private YeuCauDoiTraRepository doiTraRepository;
    @Autowired private DonHangRepository donHangRepository;
    @Autowired private NguoiDungRepository nguoiDungRepository;

    // KHÁCH HÀNG: Gửi yêu cầu
    public YeuCauDoiTra taoYeuCau(String tenDangNhap, DoiTraRequest request) {
        NguoiDung user = nguoiDungRepository.findByTenDangNhap(tenDangNhap)
                .orElseThrow(() -> new RuntimeException("Người dùng không tồn tại"));

        DonHang donHang = donHangRepository.findById(request.getDonHangId())
                .orElseThrow(() -> new RuntimeException("Đơn hàng không tồn tại"));

        // Bảo mật: Đơn hàng phải là của đúng người này
        if (!donHang.getNguoiDung().getId().equals(user.getId())) {
            throw new RuntimeException("Bạn không có quyền thao tác trên đơn hàng này!");
        }

        // Chống Spam: Đơn hàng đã claim rồi thì không claim lại
        if (doiTraRepository.existsByDonHang_Id(donHang.getId())) {
            throw new RuntimeException("Đơn hàng này đã có yêu cầu đổi trả đang được xử lý!");
        }

        YeuCauDoiTra yeuCau = new YeuCauDoiTra();
        yeuCau.setDonHang(donHang);
        yeuCau.setNguoiDung(user);
        yeuCau.setLyDo(request.getLyDo());
        yeuCau.setHinhAnhMinhHoa(request.getHinhAnhMinhHoa());

        return doiTraRepository.save(yeuCau);
    }

    // ADMIN: Duyệt yêu cầu
    public YeuCauDoiTra xuLyYeuCau(Long yeuCauId, String trangThai, Double soTienHoan, String ghiChuAdmin) {
        YeuCauDoiTra yeuCau = doiTraRepository.findById(yeuCauId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy yêu cầu đổi trả"));

        yeuCau.setTrangThai(trangThai);
        yeuCau.setSoTienHoan(soTienHoan);
        yeuCau.setGhiChuCuaAdmin(ghiChuAdmin);
        yeuCau.setNgayCapNhat(new Date());

        return doiTraRepository.save(yeuCau);
    }
        // Thêm vào DoiTraService.java
    public List<YeuCauDoiTra> layTatCaYeuCau() {
        return doiTraRepository.findAllByOrderByNgayTaoDesc();
    }
}