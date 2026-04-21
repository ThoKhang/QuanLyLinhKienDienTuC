import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import styles from './Profile.module.css';

function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axiosClient.get('/user/profile');
                setUser(res.data);
            } catch (err) {
                console.error("Lỗi tải thông tin cá nhân:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading) return <div className={styles.loading}>Đang lấy dữ liệu...</div>;
    if (!user) return <div className={styles.error}>Không tìm thấy thông tin người dùng!</div>;

    // Lấy chữ cái đầu của tên để làm Avatar
    const getInitials = (name) => {
        return name ? name.split(" ").pop().charAt(0).toUpperCase() : "K";
    };

    return (
        <div className={styles.container}>
            <div className={styles.profileCard}>
                {/* Phần Header của Card */}
                <div className={styles.cardHeader}>
                    <div className={styles.avatar}>
                        {getInitials(user.hoTen)}
                    </div>
                    <h2 className={styles.userName}>{user.hoTen}</h2>
                    <span className={styles.roleBadge}>{user.vaiTro}</span>
                </div>

                {/* Phần nội dung chi tiết */}
                <div className={styles.cardBody}>
                    <div className={styles.infoGroup}>
                        <label>Email liên hệ</label>
                        <div className={styles.value}>{user.email}</div>
                    </div>

                    <div className={styles.infoRow}>
                        <div className={styles.infoGroup}>
                            <label>Số điện thoại</label>
                            <div className={styles.value}>{user.soDienThoai || 'Chưa cập nhật'}</div>
                        </div>
                        <div className={styles.infoGroup}>
                            <label>Ngày tham gia</label>
                            <div className={styles.value}>
                                {new Date(user.ngayTao).toLocaleDateString('vi-VN')}
                            </div>
                        </div>
                    </div>

                    <div className={styles.infoGroup}>
                        <label>Địa chỉ nhận hàng</label>
                        <div className={styles.value}>{user.diaChi || 'Chưa có thông tin địa chỉ'}</div>
                    </div>
                </div>

                {/* Nút hành động */}
                <div className={styles.cardFooter}>
                    <button className={styles.btnEdit} onClick={() => alert('Tính năng đang phát triển!')}>
                        Chỉnh sửa hồ sơ
                    </button>
                    <button className={styles.btnPassword}>
                        Đổi mật khẩu
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Profile;