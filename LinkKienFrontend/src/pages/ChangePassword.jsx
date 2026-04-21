import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import styles from './Profile.module.css';

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
            // Gửi mật khẩu cũ và mới lên Backend
            await axiosClient.post('/user/change-password', {
                oldPassword: data.oldPassword,
                newPassword: data.newPassword
            });
            alert("Đổi mật khẩu thành công! Vui lòng đăng nhập lại.");
            localStorage.clear(); // Xóa token cũ
            navigate('/login');
        } catch (err) {
            // FIX LỖI [object Object]: Xử lý trả về từ Backend
            const msg = err.response?.data?.message || err.response?.data || "Mật khẩu cũ không chính xác!";
            alert(typeof msg === 'object' ? JSON.stringify(msg) : msg);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.profileCard} style={{padding: '30px', maxWidth: '450px'}}>
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
                    <button type="submit" className={styles.btnSave} style={{width: '100%', marginTop: '10px'}}>
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