package com.webnc.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;

@Entity
@Table(name = "yeu_cau_doi_tra")
@Data
public class YeuCauDoiTra {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "don_hang_id", nullable = false)
    private DonHang donHang;

    @ManyToOne
    @JoinColumn(name = "nguoi_dung_id", nullable = false)
    private NguoiDung nguoiDung;

    @Column(name = "ly_do", nullable = false, columnDefinition = "NVARCHAR(MAX)")
    private String lyDo;

    // BỔ SUNG: Trường mô tả chi tiết từ Frontend
    @Column(name = "chi_tiet", columnDefinition = "NVARCHAR(MAX)")
    private String chiTiet;

    // ĐỔI TÊN: Cho khớp với dữ liệu Controller nhận
    @Column(name = "hinh_anh", columnDefinition = "NVARCHAR(MAX)")
    private String hinhAnh;

    @Column(name = "trang_thai", length = 50)
    private String trangThai = "CHO_XU_LY"; 

    @Column(name = "so_tien_hoan")
    private Double soTienHoan = 0.0;

    @Column(name = "ghi_chu_cua_admin", columnDefinition = "NVARCHAR(MAX)")
    private String ghiChuCuaAdmin;

    @Column(name = "ngay_tao")
    private Date ngayTao = new Date();

    @Column(name = "ngay_cap_nhat")
    private Date ngayCapNhat = new Date();

    // ==========================================
    // GETTER & SETTER CHO NETBEANS
    // ==========================================
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public DonHang getDonHang() { return donHang; }
    public void setDonHang(DonHang donHang) { this.donHang = donHang; }

    public NguoiDung getNguoiDung() { return nguoiDung; }
    public void setNguoiDung(NguoiDung nguoiDung) { this.nguoiDung = nguoiDung; }

    public String getLyDo() { return lyDo; }
    public void setLyDo(String lyDo) { this.lyDo = lyDo; }

    public String getChiTiet() { return chiTiet; }
    public void setChiTiet(String chiTiet) { this.chiTiet = chiTiet; }

    public String getHinhAnh() { return hinhAnh; }
    public void setHinhAnh(String hinhAnh) { this.hinhAnh = hinhAnh; }

    public String getTrangThai() { return trangThai; }
    public void setTrangThai(String trangThai) { this.trangThai = trangThai; }

    public Double getSoTienHoan() { return soTienHoan; }
    public void setSoTienHoan(Double soTienHoan) { this.soTienHoan = soTienHoan; }

    public String getGhiChuCuaAdmin() { return ghiChuCuaAdmin; }
    public void setGhiChuCuaAdmin(String ghiChuCuaAdmin) { this.ghiChuCuaAdmin = ghiChuCuaAdmin; }

    public Date getNgayTao() { return ngayTao; }
    public void setNgayTao(Date ngayTao) { this.ngayTao = ngayTao; }

    public Date getNgayCapNhat() { return ngayCapNhat; }
    public void setNgayCapNhat(Date ngayCapNhat) { this.ngayCapNhat = ngayCapNhat; }
}