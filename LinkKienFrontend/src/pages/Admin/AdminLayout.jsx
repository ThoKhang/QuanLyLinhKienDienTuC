import { Link, Outlet, useLocation } from 'react-router-dom';
import styles from './Admin.module.css';

function AdminLayout() {
  const location = useLocation();

  const menuItems = [
    { path: '/admin', label: 'Thống kê', icon: '📊' },
    { path: '/admin/products', label: 'Sản phẩm', icon: '💻' },
    { path: '/admin/accounts', label: 'Tài khoản', icon: '👤' },
    { path: '/admin/comments', label: 'Bình luận', icon: '💬' },
    { path: '/admin/returns', label: 'Đổi trả', icon: '🔄' },
    { path: '/admin/orders', label: 'Quản lý đơn hàng', icon: '📦' }
  ];

  return (
    <div className={styles.adminContainer}>
      {/* SIDEBAR DỌC */}
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>KHSTORE ADMIN</div>
        <nav className={styles.menuList}>
          {menuItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`${styles.menuItem} ${location.pathname === item.path ? styles.menuItemActive : ''}`}
            >
              <span>{item.icon}</span> {item.label}
            </Link>
          ))}
          <Link to="/" className={styles.menuItem} style={{marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.1)'}}>
             🏠 Về trang chủ
          </Link>
        </nav>
      </div>

      {/* VÙNG HIỂN THỊ NỘI DUNG DỰA TRÊN URL */}
      <div className={styles.mainContent}>
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;