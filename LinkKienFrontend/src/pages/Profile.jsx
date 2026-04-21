import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Thêm để chuyển trang
import axiosClient from '../api/axiosClient';
import styles from './Profile.module.css';

function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    // Thêm email vào formData
    const [formData, setFormData] = useState({ 
        hoTen: '', 
        email: '', 
        soDienThoai: '', 
        diaChi: '' 
    });

    const fetchProfile = async () => {
        try {
            const res = await axiosClient.get('/user/profile');
            setUser(res.data);
            setFormData({
                hoTen: res.data.hoTen,
                email: res.data.email, // Lấy email từ DB
                soDienThoai: res.data.soDienThoai || '',
                diaChi: res.data.diaChi || ''
            });
        } catch (err) { 
            console.error("Lỗi lấy thông tin:", err); 
        } finally { 
            setLoading(false); 
        }
    };

    useEffect(() => { fetchProfile(); }, []);

    const handleSave = async () => {
        try {
            // Backend của Khang cần xử lý nhận thêm trường email nhé
            await axiosClient.put('/user/profile', formData);
            alert("Đã cập nhật thông tin thành công!");
            setIsEditing(false);
            fetchProfile(); 
        } catch (err) {
            alert(err.response?.data || "Lỗi khi cập nhật!");
        }
    };

    if (loading) return <div className={styles.loading}>Đang tải...</div>;

    return (
        <div className={styles.container}>
            <div className={styles.profileCard}>
                <div className={styles.cardHeader}>
                    <div className={styles.avatar}>{user.hoTen.charAt(0).toUpperCase()}</div>
                    <h2 className={styles.userName}>{user.hoTen}</h2>
                    <span className={styles.roleBadge}>{user.vaiTro}</span>
                </div>

                <div className={styles.cardBody}>
                    {/* HỌ TÊN */}
                    <div className={styles.infoGroup}>
                        <label>Họ và tên</label>
                        {isEditing ? (
                            <input 
                                className={styles.inputField}
                                value={formData.hoTen} 
                                onChange={(e) => setFormData({...formData, hoTen: e.target.value})}
                            />
                        ) : (
                            <div className={styles.value}>{user.hoTen}</div>
                        )}
                    </div>

                    {/* EMAIL - MỚI BỔ SUNG */}
                    <div className={styles.infoGroup}>
                        <label>Email liên hệ</label>
                        {isEditing ? (
                            <input 
                                type="email"
                                className={styles.inputField}
                                value={formData.email} 
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                        ) : (
                            <div className={styles.value}>{user.email}</div>
                        )}
                    </div>

                    {/* SỐ ĐIỆN THOẠI */}
                    <div className={styles.infoGroup}>
                        <label>Số điện thoại</label>
                        {isEditing ? (
                            <input 
                                className={styles.inputField}
                                value={formData.soDienThoai} 
                                onChange={(e) => setFormData({...formData, soDienThoai: e.target.value})}
                            />
                        ) : (
                            <div className={styles.value}>{user.soDienThoai || 'Chưa cập nhật'}</div>
                        )}
                    </div>

                    {/* ĐỊA CHỈ */}
                    <div className={styles.infoGroup}>
                        <label>Địa chỉ nhận hàng</label>
                        {isEditing ? (
                            <textarea 
                                className={styles.inputField}
                                value={formData.diaChi} 
                                onChange={(e) => setFormData({...formData, diaChi: e.target.value})}
                            />
                        ) : (
                            <div className={styles.value}>{user.diaChi || 'Chưa cập nhật'}</div>
                        )}
                    </div>
                </div>

                <div className={styles.cardFooter}>
                    {isEditing ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
                            <button className={styles.btnSave} onClick={handleSave}>Lưu thay đổi</button>
                            <button className={styles.btnCancel} onClick={() => setIsEditing(false)}>Hủy bỏ</button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
                            <button className={styles.btnEdit} onClick={() => setIsEditing(true)}>Chỉnh sửa hồ sơ</button>
                            
                            {/* NÚT ĐỔI MẬT KHẨU - MỚI BỔ SUNG */}
                            <button 
                                className={styles.btnPassword} 
                                onClick={() => navigate('/change-password')}
                                style={{
                                    background: 'none',
                                    border: '1px solid #cbd5e1',
                                    color: '#64748b',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold'
                                }}
                            >
                                🔑 Đổi mật khẩu
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;