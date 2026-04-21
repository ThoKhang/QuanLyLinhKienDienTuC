import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import styles from './MyOrders.module.css'; // Tái sử dụng CSS để đồng bộ

function MyReturns() {
    const [returns, setReturns] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReturns = async () => {
            try {
                const res = await axiosClient.get('/user/my-returns');
                setReturns(res.data);
            } catch (err) {
                console.error("Lỗi lấy yêu cầu đổi trả:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchReturns();
    }, []);

    if (loading) return <div className={styles.loading}>Đang kiểm tra dữ liệu đổi trả...</div>;

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>🔄 Yêu cầu đổi trả & Bảo hành</h2>
            <div className={styles.orderList}>
                {returns.length === 0 ? (
                    <p className={styles.empty}>Bạn không có yêu cầu đổi trả nào.</p>
                ) : (
                    returns.map(req => (
                        <div key={req.id} className={styles.orderCard}>
                            <div className={styles.orderHeader}>
                                <span>Yêu cầu cho Đơn: <b>#{req.donHang?.id}</b></span>
                                <span className={styles.status} 
                                      style={{ background: req.trangThai === 'CHO_XU_LY' ? '#fef3c7' : '#d1fae5', 
                                               color: req.trangThai === 'CHO_XU_LY' ? '#92400e' : '#065f46' }}>
                                    {req.trangThai}
                                </span>
                            </div>
                            <div className={styles.orderBody}>
                                <p>Lý do: <i>{req.lyDo}</i></p>
                                {req.ghiChuCuaAdmin && <p>Admin phản hồi: <b style={{color: '#6366f1'}}>{req.ghiChuCuaAdmin}</b></p>}
                                <p>Ngày gửi: {new Date(req.ngayTao).toLocaleDateString('vi-VN')}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default MyReturns;