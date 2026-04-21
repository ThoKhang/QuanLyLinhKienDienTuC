import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const dangXuat = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div className={styles.headerBar}>
      <Link to="/" className={styles.logo}>KhStore</Link>
      <div className={styles.navGroup}>
        <Link to="/" className={styles.navLink}>Trang chủ</Link>
        {/* NẾU ĐÃ ĐĂNG NHẬP, HIỂN THỊ NÚT GIỎ HÀNG */}
        {username && (
            <Link to="/cart" className={styles.navLink} style={{color: '#e53935'}}>
                🛒 Giỏ hàng
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