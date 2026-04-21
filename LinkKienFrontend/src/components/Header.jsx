import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';
import styles from './Header.module.css';

function Header() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [user, setUser] = useState(null); // Lưu thông tin User đầy đủ
    const [cartCount, setCartCount] = useState(0);
    const [showDropdown, setShowDropdown] = useState(false); // Trạng thái đóng/mở menu
    const [keyword, setKeyword] = useState(''); // Lưu từ khóa tìm kiếm

    // 1. Lấy thông tin họ tên đầy đủ từ API Profile
    useEffect(() => {
        if (token) {
            axiosClient.get('/user/profile')
                .then(res => setUser(res.data))
                .catch(() => {
                    localStorage.removeItem('token');
                    setUser(null);
                });
        }
    }, [token]);

    // 2. Lấy số lượng giỏ hàng (Logic của Khang rất tốt, mình giữ nguyên)
    const fetchCartCount = async () => {
        if (!token) return;
        try {
            const response = await axiosClient.get('/gio-hang');
            const total = response.data.reduce((sum, item) => sum + item.soLuong, 0);
            setCartCount(total);
        } catch (error) { console.error("Lỗi lấy giỏ hàng"); }
    };

    useEffect(() => {
        fetchCartCount();
        window.addEventListener('cartUpdated', fetchCartCount);
        return () => window.removeEventListener('cartUpdated', fetchCartCount);
    }, [token]);

    // 3. Xử lý tìm kiếm
    const handleSearch = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/?search=${keyword}`); // Chuyển hướng kèm tham số search
        } else {
            navigate('/');
        }
    };

    const dangXuat = () => {
        localStorage.clear();
        setUser(null);
        setCartCount(0);
        navigate('/login');
    };

    return (
        <div className={styles.headerBar}>
            <Link to="/" className={styles.logo}>KhStore</Link>

            {/* THANH TÌM KIẾM MỚI */}
            <form className={styles.searchBox} onSubmit={handleSearch}>
                <input 
                    type="text" 
                    placeholder="Tìm linh kiện PC..." 
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button type="submit">🔍</button>
            </form>

            <div className={styles.navGroup}>
                {token && (
                    <Link to="/cart" className={styles.navLink} style={{color: '#6366f1', position: 'relative'}}>
                        🛒 Giỏ hàng
                        {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
                    </Link>
                )}
                
                {user ? (
                    <div className={styles.userContainer}>
                        <div className={styles.userTrigger} onClick={() => setShowDropdown(!showDropdown)}>
                            Xin chào, <b>{user.hoTen}</b> ▾
                        </div>
                        
                        {/* MENU XỔ XUỐNG (DROPDOWN) */}
                        {showDropdown && (
                            <div className={styles.userDropdown}>
                                <Link to="/profile" onClick={() => setShowDropdown(false)}>👤 Tài khoản</Link>
                                <Link to="/my-orders" onClick={() => setShowDropdown(false)}>📦 Lịch sử mua hàng</Link>
                                <Link to="/my-returns" onClick={() => setShowDropdown(false)}>🔄 Đổi trả & Bảo hành</Link>
                                <hr />
                                <button onClick={dangXuat} className={styles.btnDropdownLogout}>🚪 Đăng xuất</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div style={{display: 'flex', gap: '10px'}}>
                        <Link to="/login" className={styles.navLink}>Đăng nhập</Link>
                        <Link to="/register" className={styles.btnRegister}>Đăng ký</Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;