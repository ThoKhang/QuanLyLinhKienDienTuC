import { Link, Outlet, useLocation } from 'react-router-dom';
import styles from './Admin.module.css';

function AdminLayout() {
  const location = useLocation();

  const menuItems = [
    { path: '/admin', label: 'Thống kê', icon: '📊' },
    { path: '/admin/products', label: 'Sản phẩm', icon: '💻' },
    { path: '/admin/orders', label: 'Đơn hàng', icon: '📦' },
    { path: '/admin/returns', label: 'Đổi trả', icon: '🔄' },
    { path: '/admin/accounts', label: 'Tài khoản', icon: '👤' },
    { path: '/admin/comments', label: 'Bình luận', icon: '💬' },
  ];

  return (
    <div className={styles.adminContainer}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.sidebarLogo}>
            <div className={styles.logoIcon}>⚡</div>
            <div>
              <div className={styles.logoText}>KHSTORE</div>
              <span className={styles.logoSub}>Control Panel</span>
            </div>
          </div>
        </div>

        <ul className={styles.menuList}>
          <li className={styles.menuSection}>Quản lý</li>
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`${styles.menuItem} ${location.pathname === item.path ? styles.menuItemActive : ''}`}
              >
                <span className={styles.menuIcon}>{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.sidebarFooter}>
          <Link to="/" className={styles.menuItemHome}>
            <span className={styles.menuIcon}>🏠</span>
            Về trang chủ
          </Link>
        </div>
      </div>

      <div className={styles.mainContent}>
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;