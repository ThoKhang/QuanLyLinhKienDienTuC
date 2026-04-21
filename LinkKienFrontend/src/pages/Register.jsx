import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import styles from './Auth.module.css'; 

function Register() {
    const [form, setForm] = useState({ tenDangNhap: '', matKhau: '', hoTen: '', email: '' });
    const [loi, setLoi] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const xuLyDangKy = async (e) => {
        e.preventDefault();
        setLoi('');
        try {
            await axiosClient.post('/auth/register', form);
            alert('Đăng ký thành công! Vui lòng đăng nhập.');
            navigate('/login');
        } catch (error) {
            setLoi(error.response?.data || 'Có lỗi xảy ra khi đăng ký!');
        }
    };

    return (
        <div className={styles.authWrapper}>
            <div className={styles.authForm}>
                <h2 className={styles.title}>Tạo Tài Khoản Mới</h2>
                {loi && <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>{loi}</p>}
                
                <form onSubmit={xuLyDangKy}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Tên đăng nhập:</label>
                        <input className={styles.input} type="text" name="tenDangNhap" onChange={handleChange} required />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Mật khẩu:</label>
                        <input className={styles.input} type="password" name="matKhau" onChange={handleChange} required />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Họ và tên:</label>
                        <input className={styles.input} type="text" name="hoTen" onChange={handleChange} required />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Email:</label>
                        <input className={styles.input} type="email" name="email" onChange={handleChange} required />
                    </div>
                    <button type="submit" className={styles.btnPrimary}>Đăng Ký</button>
                </form>

                <p className={styles.linkText}>
                    Đã có tài khoản? <Link to="/login" className={styles.link}>Đăng nhập</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;