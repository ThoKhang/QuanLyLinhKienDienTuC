import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'; // Thêm useState, useEffect
import axiosClient from '../api/axiosClient';
import styles from './Header.module.css';

function Header() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const [cartCount, setCartCount] = useState(0);

  // Hàm lấy số lượng từ API
  const fetchCartCount = async () => {
    if (!username) return;
    try {
      const response = await axiosClient.get('/gio-hang');
      // Tính tổng số lượng (soLuong) của tất cả item trong giỏ
      const total = response.data.reduce((sum, item) => sum + item.soLuong, 0);
      setCartCount(total);
    } catch (error) {
      console.error("Lỗi lấy số lượng giỏ hàng");
    }
  };

  useEffect(() => {
    fetchCartCount();
    // Lắng nghe sự kiện "cartUpdated" khi người dùng thêm hàng ở trang khác
    window.addEventListener('cartUpdated', fetchCartCount);
    return () => window.removeEventListener('cartUpdated', fetchCartCount);
  }, [username]);

  const dangXuat = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setCartCount(0);
    navigate('/login');
  };

  return (
    <div className={styles.headerBar}>
      <Link to="/" className={styles.logo}>KhStore</Link>
      <div className={styles.navGroup}>
        <Link to="/" className={styles.navLink}>Trang chủ</Link>
        
        {username && (
            <Link to="/cart" className={styles.navLink} style={{color: '#e53935', position: 'relative'}}>
                🛒 Giỏ hàng
                {cartCount > 0 && (
                  <span style={{
                    position: 'absolute', top: '-10px', right: '-10px',
                    backgroundColor: 'red', color: 'white', borderRadius: '50%',
                    padding: '2px 6px', fontSize: '12px'
                  }}>{cartCount}</span>
                )}
            </Link>
        )}
        
        {username ? (
          <>
            <span style={{ color: '#666' }}>Xin chào, <b>{username}</b>!</span>
            <button onClick={dangXuat} className={styles.btnLogout}>Đăng xuất</button>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.navLink}>Đăng nhập</Link>
            <Link to="/register" className={styles.btnRegister}>Đăng ký</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;