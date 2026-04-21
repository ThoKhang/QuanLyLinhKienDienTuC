import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import styles from './MyOrders.module.css';

function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // API này Khang cần viết ở Backend để lấy đơn theo User đang login
                const res = await axiosClient.get('/user/orders'); 
                setOrders(res.data);
            } catch (err) {
                console.error("Lỗi lấy đơn hàng:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const getStatusStyle = (status) => {
        switch(status) {
            case 'CHO_XAC_NHAN': return { color: '#f59e0b', background: '#fef3c7' };
            case 'DANG_GIAO': return { color: '#3b82f6', background: '#dbeafe' };
            case 'DA_GIAO': return { color: '#10b981', background: '#d1fae5' };
            default: return { color: '#64748b', background: '#f1f5f9' };
        }
    };

    if (loading) return <div className={styles.loading}>Đang tải đơn hàng...</div>;

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>📦 Lịch sử mua hàng</h2>
            <div className={styles.orderList}>
                {orders.length === 0 ? (
                    <p className={styles.empty}>Bạn chưa có đơn hàng nào tại KhStore.</p>
                ) : (
                    orders.map(order => (
                        <div key={order.id} className={styles.orderCard}>
                            <div className={styles.orderHeader}>
                                <span>Mã đơn: <b>#{order.id}</b></span>
                                <span className={styles.status} style={getStatusStyle(order.trangThaiDon)}>
                                    {order.trangThaiDon}
                                </span>
                            </div>
                            <div className={styles.orderBody}>
                                <p>Ngày đặt: {new Date(order.ngayDat).toLocaleDateString('vi-VN')}</p>
                                <p>Tổng tiền: <b className={styles.price}>{new Intl.NumberFormat('vi-VN').format(order.tongTien)}đ</b></p>
                                <p>Thanh toán: {order.phuongThucThanhToan}</p>
                            </div>
                            <button className={styles.btnDetail}>Xem chi tiết đơn</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default MyOrders;