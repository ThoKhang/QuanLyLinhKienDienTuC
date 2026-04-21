import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import styles from './Cart.module.css';

function Cart() {
  const [gioHang, setGioHang] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const layGioHang = async () => {
    try {
      const res = await axiosClient.get('/gio-hang');
      setGioHang(res.data);
    } catch (error) {
      console.error('Lỗi tải giỏ hàng:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { layGioHang(); }, []);

  const capNhatSoLuong = async (id, soLuongMoi, soLuongTonKho) => {
    if (soLuongMoi < 1) return;
    if (soLuongMoi > soLuongTonKho) {
      alert('Rất tiếc, vượt quá số lượng trong kho!');
      return;
    }
    try {
      await axiosClient.put(`/gio-hang/cap-nhat/${id}?soLuong=${soLuongMoi}`);
      layGioHang();
      window.dispatchEvent(new Event('cartUpdated'));
    } catch {
      alert('Lỗi cập nhật số lượng');
    }
  };

  const xoaSanPham = async (id) => {
    if (window.confirm('Bỏ sản phẩm này khỏi giỏ?')) {
      await axiosClient.delete(`/gio-hang/xoa/${id}`);
      layGioHang();
      window.dispatchEvent(new Event('cartUpdated'));
    }
  };

  const tinhTongTien = () =>
    gioHang.reduce((t, item) => t + item.sanPham.giaBan * item.soLuong, 0);

  const formatTien = (tien) =>
    new Intl.NumberFormat('vi-VN').format(tien) + ' ₫';

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '80px', fontSize: 16, color: '#64748b', fontFamily: 'DM Sans,sans-serif' }}>
      Đang tải giỏ hàng...
    </div>
  );

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.inner}>
        <h2 className={styles.pageTitle}>
          Giỏ hàng
          {gioHang.length > 0 && (
            <span className={styles.cartCount}>{gioHang.length} sản phẩm</span>
          )}
        </h2>

        {gioHang.length === 0 ? (
          <div className={styles.emptyCard}>
            <div className={styles.emptyIcon}>🛒</div>
            <p className={styles.emptyText}>Giỏ hàng của bạn đang trống.</p>
            <Link to="/" className={styles.btnShopNow}>Khám phá linh kiện ngay</Link>
          </div>
        ) : (
          <div className={styles.layout}>
            {/* DANH SÁCH SẢN PHẨM */}
            <div className={styles.itemsList}>
              {gioHang.map((item, i) => (
                <div
                  key={item.id}
                  className={styles.cartItem}
                  style={{ animationDelay: `${i * 0.06}s` }}
                >
                  <img
                    src={item.sanPham.hinhAnh || 'https://placehold.co/80x80?text=SP'}
                    alt={item.sanPham.tenSanPham}
                    className={styles.itemImg}
                  />
                  <div className={styles.itemInfo}>
                    <h4 className={styles.itemName}>{item.sanPham.tenSanPham}</h4>
                    <div className={styles.itemPrice}>{formatTien(item.sanPham.giaBan)}</div>
                  </div>

                  <div className={styles.qtyControl}>
                    <button
                      className={styles.qtyBtn}
                      onClick={() => capNhatSoLuong(item.id, item.soLuong - 1, item.sanPham.soLuongTon)}
                    >−</button>
                    <span className={styles.qtyNum}>{item.soLuong}</span>
                    <button
                      className={styles.qtyBtn}
                      onClick={() => capNhatSoLuong(item.id, item.soLuong + 1, item.sanPham.soLuongTon)}
                    >+</button>
                  </div>

                  <button className={styles.btnRemove} onClick={() => xoaSanPham(item.id)}>
                    🗑 Xóa
                  </button>
                </div>
              ))}
            </div>

            {/* TỔNG TIỀN */}
            <div className={styles.summaryPanel}>
              <h3 className={styles.summaryTitle}>Tóm tắt đơn hàng</h3>
              <div className={styles.summaryRow}>
                <span>Tạm tính ({gioHang.length} sản phẩm)</span>
                <span style={{ color: '#334155', fontWeight: 600 }}>{formatTien(tinhTongTien())}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Phí vận chuyển</span>
                <span style={{ color: '#16a34a', fontWeight: 600 }}>Miễn phí</span>
              </div>
              <div className={styles.summaryDivider} />
              <div className={styles.summaryTotal}>
                <span className={styles.summaryTotalLabel}>Tổng cộng</span>
                <span className={styles.summaryTotalValue}>{formatTien(tinhTongTien())}</span>
              </div>
              <button className={styles.btnCheckout} onClick={() => navigate('/checkout')}>
                Tiến hành thanh toán →
              </button>
              <div className={styles.secureNote}>
                🔒 Thanh toán bảo mật & an toàn
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;