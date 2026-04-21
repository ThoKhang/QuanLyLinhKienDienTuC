import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import styles from './Auth.module.css'; // Gọi CSS Module

function Login() {
    const [tenDangNhap, setTenDangNhap] = useState('');
    const [matKhau, setMatKhau] = useState('');
    const [loi, setLoi] = useState(''); 
    const navigate = useNavigate(); 

    const xuLyDangNhap = async (e) => {
        e.preventDefault();
        setLoi(''); 
        try {
            const response = await axiosClient.post('/auth/login', { tenDangNhap, matKhau });
            localStorage.setItem('token', response.data);
            localStorage.setItem('username', tenDangNhap);
            navigate('/');
        } catch (error) {
            setLoi('Tài khoản hoặc mật khẩu không chính xác!');
        }
    };

    return (
        <div className={styles.authWrapper}>
            <div className={styles.authForm}>
                <h2 className={styles.title}>Đăng Nhập</h2>
                {loi && <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>{loi}</p>}
                
                <form onSubmit={xuLyDangNhap}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Tên đăng nhập:</label>
                        <input className={styles.input} type="text" value={tenDangNhap} onChange={(e) => setTenDangNhap(e.target.value)} required placeholder="Nhập tài khoản..." />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Mật khẩu:</label>
                        <input className={styles.input} type="password" value={matKhau} onChange={(e) => setMatKhau(e.target.value)} required placeholder="Nhập mật khẩu..." />
                    </div>
                    <button type="submit" className={styles.btnPrimary}>Đăng Nhập Vào Hệ Thống</button>
                </form>

                <p className={styles.linkText}>
                    Chưa có tài khoản? <Link to="/register" className={styles.link}>Đăng ký ngay</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;