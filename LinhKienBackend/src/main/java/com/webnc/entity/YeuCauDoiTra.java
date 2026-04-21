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

    @Column(name = "hinh_anh_minh_hoa", columnDefinition = "NVARCHAR(MAX)")
    private String hinhAnhMinhHoa;

    @Column(name = "trang_thai", length = 50)
    private String trangThai = "CHO_XU_LY"; // CHO_XU_LY, DA_HOAN_TIEN, TU_CHOI

    @Column(name = "so_tien_hoan")
    private Double soTienHoan = 0.0;

    @Column(name = "ghi_chu_cua_admin", columnDefinition = "NVARCHAR(MAX)")
    private String ghiChuCuaAdmin;

    @Column(name = "ngay_tao")
    private Date ngayTao = new Date();

    @Column(name = "ngay_cap_nhat")
    private Date ngayCapNhat = new Date();
}