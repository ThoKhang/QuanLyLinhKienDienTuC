package com.webnc.service;

import com.webnc.entity.DanhMuc;
import com.webnc.entity.SanPham;
import com.webnc.repository.DanhMucRepository;
import com.webnc.repository.SanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SanPhamService {

    @Autowired
    private SanPhamRepository sanPhamRepository;

    @Autowired
    private DanhMucRepository danhMucRepository;

    // Lấy tất cả sản phẩm (Cho khách hàng xem)
    public List<SanPham> layTatCaSanPham() {
        return sanPhamRepository.findAll();
    }

    // Lấy chi tiết 1 linh kiện theo ID
    public SanPham laySanPhamTheoId(Long id) {
        return sanPhamRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sản phẩm không tồn tại với ID: " + id));
    }

    // Thêm mới sản phẩm (Chỉ dành cho Admin)
    public SanPham themSanPham(SanPham sanPham, Long danhMucId) {
        if (sanPhamRepository.existsByMaSanPham(sanPham.getMaSanPham())) {
            throw new RuntimeException("Mã linh kiện (SKU) đã tồn tại trong hệ thống!");
        }

        // Tìm danh mục xem có tồn tại không
        DanhMuc danhMuc = danhMucRepository.findById(danhMucId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục!"));

        sanPham.setDanhMuc(danhMuc);
        return sanPhamRepository.save(sanPham);
    }

    // Bổ sung hàm Cập nhật sản phẩm
    public SanPham capNhatSanPham(Long id, SanPham spMoi) {
        SanPham spCu = sanPhamRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm để cập nhật!"));

        // Cập nhật các trường cơ bản
        spCu.setTenSanPham(spMoi.getTenSanPham());
        spCu.setMaSanPham(spMoi.getMaSanPham());
        spCu.setGiaBan(spMoi.getGiaBan());
        spCu.setSoLuongTon(spMoi.getSoLuongTon()); // Đã chuẩn hóa thành soLuongTon
        spCu.setMoTa(spMoi.getMoTa());
        
        // Nếu có up ảnh mới thì mới đè ảnh cũ
        if (spMoi.getHinhAnh() != null && !spMoi.getHinhAnh().isEmpty()) {
            spCu.setHinhAnh(spMoi.getHinhAnh());
        }
        
        // Cập nhật danh sách thông số kỹ thuật
        if (spMoi.getChiTietLinhKiens() != null) {
            spCu.getChiTietLinhKiens().clear(); 
            spCu.getChiTietLinhKiens().addAll(spMoi.getChiTietLinhKiens()); 
        }

        return sanPhamRepository.save(spCu);
    }

    // Xóa sản phẩm
    public void xoaSanPham(Long id) {
        if (!sanPhamRepository.existsById(id)) {
            throw new RuntimeException("Sản phẩm không tồn tại!");
        }
        sanPhamRepository.deleteById(id);
    }
}