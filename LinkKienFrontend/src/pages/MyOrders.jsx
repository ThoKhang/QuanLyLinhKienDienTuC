import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import styles from './MyOrders.module.css';

function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            // Đã sửa lại đường dẫn API cho đúng với Backend
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

    // Hàm hiển thị màu sắc theo trạng thái
    const getStatusStyle = (status) => {
        switch(status) {
            case 'CHO_XAC_NHAN': return { color: '#d97706', background: '#fef3c7' };
            case 'DANG_GIAO': return { color: '#2563eb', background: '#dbeafe' };
            case 'DA_GIAO': return { color: '#059669', background: '#d1fae5' };
            case 'DA_HUY': return { color: '#dc2626', background: '#fee2e2' };
            default: return { color: '#475569', background: '#f1f5f9' };
        }
    };

    // Hàm xử lý khi nhấn Đổi trả
    const handleDoiTra = (donHangId) => {
        const lyDo = window.prompt("Vui lòng nhập lý do bạn muốn đổi/trả đơn hàng này:");
        if (lyDo) {
            alert(`Đã gửi yêu cầu đổi trả cho đơn #${donHangId} với lý do: ${lyDo}\n(Chức năng này cần viết thêm API ở Backend)`);
            // Sau này Khang sẽ gọi axiosClient.post('/yeu-cau-doi-tra', { donHangId, lyDo }) ở đây
        }
    };

    // Hàm xử lý khi nhấn Đánh giá
    const handleDanhGia = (donHangId) => {
        alert(`Chuyển sang trang đánh giá sản phẩm cho đơn #${donHangId}...\n(Chức năng này cần tạo form đánh giá riêng)`);
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
                            {/* Phần Header đơn hàng */}
                            <div className={styles.orderHeader}>
                                <span>Mã đơn: <b>#{order.id}</b></span>
                                <span className={styles.status} style={getStatusStyle(order.trangThaiDon)}>
                                    {order.trangThaiDon === 'DA_GIAO' ? 'Đã giao thành công' : order.trangThaiDon}
                                </span>
                            </div>
                            
                            {/* Phần nội dung */}
                            <div className={styles.orderBody}>
                                <p>Ngày đặt: {new Date(order.ngayDat).toLocaleDateString('vi-VN')} lúc {new Date(order.ngayDat).toLocaleTimeString('vi-VN')}</p>
                                <p>Tổng tiền: <b className={styles.price}>{new Intl.NumberFormat('vi-VN').format(order.tongTien)}đ</b></p>
                                <p>Thanh toán: {order.phuongThucThanhToan === 'TIEN_MAT' ? 'Tiền mặt (COD)' : 'Chuyển khoản QR'}</p>
                            </div>
                            
                            {/* Nút thao tác: Sẽ thay đổi tùy theo trạng thái */}
                            <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                                <button className={styles.btnDetail}>Xem chi tiết</button>
                                
                                {/* CHỈ HIỂN THỊ 2 NÚT NÀY KHI ĐƠN HÀNG ĐÃ GIAO */}
                                {order.trangThaiDon === 'DA_GIAO' && (
                                    <>
                                        <button 
                                            style={{ background: '#f59e0b', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                                            onClick={() => handleDanhGia(order.id)}
                                        >
                                            ⭐ Đánh giá
                                        </button>
                                        <button 
                                            style={{ background: 'white', color: '#dc2626', border: '1px solid #dc2626', padding: '8px 15px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                                            onClick={() => handleDoiTra(order.id)}
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