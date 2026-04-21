import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import styles from './MyOrders.module.css';
import { useNavigate } from 'react-router-dom';

function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchOrders = async () => {
        try {
            const res = await axiosClient.get('/don-hang/lich-su'); 
            setOrders(res.data);
        } catch (err) {
            console.error("Lỗi lấy đơn hàng:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const getStatusStyle = (status) => {
        switch(status) {
            case 'CHO_XAC_NHAN': return { color: '#d97706', background: '#fef3c7' };
            case 'DANG_GIAO': return { color: '#2563eb', background: '#dbeafe' };
            case 'DA_GIAO': return { color: '#059669', background: '#d1fae5' };
            case 'DA_HUY': return { color: '#dc2626', background: '#fee2e2' };
            default: return { color: '#475569', background: '#f1f5f9' };
        }
    };

    const vietsubStatus = (status) => {
        const map = {
            'CHO_XAC_NHAN': 'Chờ xác nhận',
            'DANG_GIAO': 'Đang giao hàng',
            'DA_GIAO': 'Đã giao thành công',
            'DA_HUY': 'Đã hủy'
        };
        return map[status] || status;
    };

    if (loading) return <div className={styles.loading}>Đang tải lịch sử đơn hàng...</div>;

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>📦 Lịch sử mua hàng</h2>
            <div className={styles.orderList}>
                {orders.length === 0 ? (
                    <div className={styles.empty}>
                        <p>Bạn chưa có đơn hàng nào tại KhStore.</p>
                    </div>
                ) : (
                    orders.map(order => (
                        <div key={order.id} className={styles.orderCard}>
                            <div className={styles.orderHeader}>
                                <span>Mã đơn: <b>#{order.id}</b></span>
                                <span className={styles.status} style={getStatusStyle(order.trangThaiDon)}>
                                    {vietsubStatus(order.trangThaiDon)}
                                </span>
                            </div>
                            
                            <div className={styles.orderBody}>
                                <p>Ngày đặt: {new Date(order.ngayDat).toLocaleDateString('vi-VN')} lúc {new Date(order.ngayDat).toLocaleTimeString('vi-VN')}</p>
                                <p>Tổng tiền: <b className={styles.price}>{new Intl.NumberFormat('vi-VN').format(order.tongTien)}đ</b></p>
                                <p>Thanh toán: {order.phuongThucThanhToan === 'TIEN_MAT' ? 'Tiền mặt (COD)' : 'Chuyển khoản QR'}</p>
                            </div>
                            
                            <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                                <button className={styles.btnDetail} onClick={() => navigate(`/order-detail/${order.id}`)}>
                                    Xem chi tiết
                                </button>
                                
                                {order.trangThaiDon === 'DA_GIAO' && (
                                    <>
                                        <button 
                                            style={{ background: '#f59e0b', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                                            onClick={() => navigate(`/review/${order.id}`)}
                                        >
                                            ⭐ Đánh giá
                                        </button>
                                        <button 
                                            style={{ background: 'white', color: '#dc2626', border: '1px solid #dc2626', padding: '8px 15px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                                            onClick={() => navigate(`/return/${order.id}`)}
                                        >
                                            🔄 Đổi / Trả hàng
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default MyOrders;