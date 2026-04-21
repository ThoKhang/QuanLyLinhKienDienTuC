import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import styles from './ProductDetail.module.css';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resProduct, resReviews] = await Promise.all([
          axiosClient.get(`/public/san-pham/${id}`),
          axiosClient.get(`/public/danh-gia/${id}`),
        ]);
        setProduct(resProduct.data);
        setReviews(resReviews.data);
      } catch (err) {
        console.error('Lỗi tải dữ liệu:', err);
      }
    };
    fetchData();
  }, [id]);

  const formatTien = (tien) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tien);

  const renderStars = (rating) =>
    '★'.repeat(rating) + '☆'.repeat(5 - rating);

  const handleAddToCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Vui lòng đăng nhập để mua hàng!');
      navigate('/login');
      return;
    }
    try {
      await axiosClient.post(`/gio-hang/them?sanPhamId=${id}&soLuong=1`);
      window.dispatchEvent(new Event('cartUpdated'));
      alert('Đã thêm sản phẩm vào giỏ hàng!');
    } catch {
      alert('Lỗi khi thêm vào giỏ hàng');
    }
  };

  if (!product) return <div className={styles.loading}>Đang tải linh kiện KhStore...</div>;

  return (
    <div className={styles.pageWrapper}>
      {/* BREADCRUMB */}
      <div className={styles.breadcrumb}>
        <span className={styles.breadcrumbLink} onClick={() => navigate('/')}>Trang chủ</span>
        <span>›</span>
        <span>{product.danhMuc?.tenDanhMuc || 'Sản phẩm'}</span>
        <span>›</span>
        <span style={{ color: '#334155', fontWeight: 500 }}>{product.tenSanPham}</span>
      </div>

      {/* MAIN */}
      <div className={styles.container}>
        <div className={styles.imageSection}>
          <img className={styles.productImg} src={product.hinhAnh} alt={product.tenSanPham} />
        </div>

        <div className={styles.infoSection}>
          <span className={styles.categoryTag}>{product.danhMuc?.tenDanhMuc}</span>
          <h1 className={styles.title}>{product.tenSanPham}</h1>

          <div className={styles.priceBlock}>
            <div className={styles.price}>{formatTien(product.giaBan)}</div>
            <div className={styles.priceNote}>Đã bao gồm VAT</div>
          </div>

          <div className={styles.inStockBadge}>
            ✓ Còn hàng — Giao nhanh trong 24h
          </div>

          <div className={styles.divider} />

          <div className={styles.descLabel}>Mô tả sản phẩm</div>
          <p className={styles.description}>{product.moTa}</p>

          <div className={styles.actionButtons}>
            <button className={styles.btnCart} onClick={handleAddToCart}>
              🛒 Thêm vào giỏ hàng
            </button>
            <button className={styles.btnBack} onClick={() => navigate('/')}>
              ← Quay lại
            </button>
          </div>
        </div>
      </div>

      {/* THÔNG SỐ KỸ THUẬT */}
      {product.chiTietLinhKiens?.length > 0 && (
        <div className={styles.specsSection}>
          <div className={styles.sectionCard}>
            <div className={styles.sectionCardHeader}>
              <div className={styles.sectionCardTitleIcon} />
              <h2 className={styles.sectionCardTitle}>Thông số kỹ thuật chi tiết</h2>
            </div>
            <table className={styles.specsTable}>
              <tbody>
                {product.chiTietLinhKiens.map((spec, i) => (
                  <tr key={i}>
                    <td className={styles.specKey}>{spec.tenThongSo}</td>
                    <td className={styles.specVal}>{spec.giaTri}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ĐÁNH GIÁ */}
      <div className={styles.reviewSection}>
        <div className={styles.sectionCard}>
          <div className={styles.sectionCardHeader}>
            <div className={styles.sectionCardTitleIcon} />
            <h2 className={styles.sectionCardTitle}>
              Đánh giá từ khách hàng
              {reviews.length > 0 && (
                <span style={{ marginLeft: 10, fontSize: 13, fontWeight: 500, color: '#64748b', fontFamily: 'DM Sans,sans-serif' }}>
                  ({reviews.length} đánh giá)
                </span>
              )}
            </h2>
          </div>

          <div style={{ padding: '0 28px 16px' }}>
            {reviews.length === 0 ? (
              <p className={styles.noReview}>
                Chưa có đánh giá nào. Hãy là người đầu tiên mua và đánh giá!
              </p>
            ) : (
              reviews.map((rv, i) => (
                <div key={rv.id} className={styles.reviewItem} style={{ animationDelay: `${i * 0.07}s` }}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.userInfo}>
                      <div className={styles.userAvatar}>
                        {(rv.nguoiDung?.hoTen || 'K')[0].toUpperCase()}
                      </div>
                      <div>
                        <div className={styles.userName}>
                          {rv.nguoiDung?.hoTen || 'Khách hàng ẩn danh'}
                        </div>
                        <span className={styles.verified}>✔ Đã mua hàng</span>
                      </div>
                    </div>
                    <span className={styles.starRating} style={{ color: '#f59e0b' }}>
                      {renderStars(rv.soSao)}
                    </span>
                  </div>

                  <p className={styles.reviewContent}>{rv.noiDung}</p>

                  {rv.hinhAnh && (
                    <div className={styles.reviewImages}>
                      <img
                        src={rv.hinhAnh}
                        alt="Ảnh đánh giá"
                        className={styles.reviewImg}
                        onClick={() => window.open(rv.hinhAnh, '_blank')}
                      />
                    </div>
                  )}

                  <div className={styles.reviewFooter}>
                    Đăng ngày: {new Date(rv.ngayTao).toLocaleDateString('vi-VN')}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;