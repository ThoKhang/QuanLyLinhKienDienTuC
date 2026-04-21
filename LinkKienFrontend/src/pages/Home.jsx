import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import styles from './Home.module.css';

function Home() {
  const [sanPhams, setSanPhams] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const layDuLieu = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const query = searchParams.get('search');
        const response = query
          ? await axiosClient.get(`/public/san-pham/search?ten=${query}`)
          : await axiosClient.get('/public/san-pham');
        setSanPhams(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy sản phẩm:', error);
      }
    };
    layDuLieu();
  }, [location.search]);

  const formatTien = (tien) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tien);

  const themVaoGio = async (e, sanPhamId) => {
    e.stopPropagation();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Vui lòng đăng nhập để mua hàng!');
      navigate('/login');
      return;
    }
    try {
      await axiosClient.post(`/gio-hang/them?sanPhamId=${sanPhamId}&soLuong=1`);
      window.dispatchEvent(new Event('cartUpdated'));
      alert('Đã thêm vào giỏ hàng thành công!');
    } catch {
      alert('Không thể thêm vào giỏ hàng. Vui lòng thử lại!');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.heroSection}>
        <h1 className={styles.headerTitle}>
          Khang <span className={styles.headerTitleAccent}>PC</span> & Gaming Gear
        </h1>
        <p className={styles.subTitle}>Nâng tầm sức mạnh cỗ máy của bạn — Linh kiện chính hãng, giá tốt nhất</p>
      </div>

      <div className={styles.sectionLabel}>
        <span className={styles.sectionLabelLine}>Tất cả sản phẩm</span>
        {sanPhams.length > 0 && (
          <span className={styles.sectionLabelCount}>{sanPhams.length} sản phẩm</span>
        )}
      </div>

      <div className={styles.productGrid}>
        {sanPhams.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🔍</div>
            <p className={styles.emptyText}>Không tìm thấy linh kiện phù hợp với yêu cầu của bạn.</p>
          </div>
        ) : (
          sanPhams.map((sp, i) => (
            <div
              className={styles.productItem}
              key={sp.id}
              style={{ animationDelay: `${i * 0.05}s` }}
              onClick={() => navigate(`/product/${sp.id}`)}
            >
              <div className={styles.imgWrapper}>
                <img
                  className={styles.productImg}
                  src={sp.hinhAnh || 'https://placehold.co/300x300?text=KhStore'}
                  alt={sp.tenSanPham}
                />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.productName}>{sp.tenSanPham}</h3>
                <p className={styles.productDesc}>{sp.moTa}</p>
                <div className={styles.priceRow}>
                  <span className={styles.productPrice}>{formatTien(sp.giaBan)}</span>
                  <button className={styles.btnCart} onClick={(e) => themVaoGio(e, sp.id)}>
                    🛒 Thêm vào giỏ
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;