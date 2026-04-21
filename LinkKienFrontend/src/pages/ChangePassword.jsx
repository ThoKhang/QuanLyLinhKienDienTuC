import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import styles from './Profile.module.css'; // Tái sử dụng CSS cũ

function ChangePassword() {
    const [data, setData] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
    const navigate = useNavigate();

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (data.newPassword !== data.confirmPassword) {
            alert("Mật khẩu mới không trùng khớp!");
            return;
        }
        try {
            // Khang cần viết API /api/user/change-password ở Backend nhé
            await axiosClient.post('/user/change-password', data);
            alert("Đổi mật khẩu thành công! Vui lòng đăng nhập lại.");
            localStorage.clear();
            navigate('/login');
        } catch (err) {
            alert(err.response?.data || "Lỗi khi đổi mật khẩu");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.profileCard} style={{padding: '30px'}}>
                <h2 style={{marginBottom: '20px', color: '#1e293b'}}>Đổi mật khẩu</h2>
                <form onSubmit={handleUpdate}>
                    <div className={styles.infoGroup}>
                        <label>Mật khẩu hiện tại</label>
                        <input type="password" className={styles.inputField} required
                            onChange={(e) => setData({...data, oldPassword: e.target.value})} />
                    </div>
                    <div className={styles.infoGroup}>
                        <label>Mật khẩu mới</label>
                        <input type="password" className={styles.inputField} required
                            onChange={(e) => setData({...data, newPassword: e.target.value})} />
                    </div>
                    <div className={styles.infoGroup}>
                        <label>Xác nhận mật khẩu mới</label>
                        <input type="password" className={styles.inputField} required
                            onChange={(e) => setData({...data, confirmPassword: e.target.value})} />
                    </div>
                    <button type="submit" className={styles.btnEdit} style={{width: '100%', marginTop: '10px'}}>
                        Xác nhận đổi mật khẩu
                    </button>
                    <button type="button" className={styles.btnCancel} style={{width: '100%'}} 
                        onClick={() => navigate('/profile')}>Quay lại</button>
                </form>
            </div>
        </div>
    );
}

export default ChangePassword;