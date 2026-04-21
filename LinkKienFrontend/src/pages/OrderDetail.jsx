import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import styles from './MyOrders.module.css';

function OrderDetail() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axiosClient.get(`/don-hang/chi-tiet/${id}`)
            .then(res => setData(res.data))
            .catch(err => console.error(err));
    }, [id]);

    const vietsub = (s) => {
        const map = {
            'CHO_XAC_NHAN': 'Chờ xác nhận',
            'DANG_GIAO': 'Đang giao hàng',
            'DA_GIAO': 'Đã giao thành công',
            'DA_HUY': 'Đã hủy'
        };
        return map[s] || s;
    };

    if (!data) return <div>Đang tải...</div>;

    return (
        <div className={styles.container} style={{ maxWidth: '800px' }}>
            <h2>Chi tiết đơn hàng #{id}</h2>
            <div className={styles.orderCard}>
                <p>Trạng thái: <b>{vietsub(data.donHang.trangThaiDon)}</b></p>
                <p>Địa chỉ: {data.donHang.diaChiGiaoHang}</p>
                <hr />
                {data.sanPhams.map(item => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span>{item.sanPham.tenSanPham} x {item.soLuong}</span>
                        <b>{new Intl.NumberFormat('vi-VN').format(item.donGia * item.soLuong)}đ</b>
                    </div>
                ))}
                <hr />
                <h3 style={{ textAlign: 'right', color: '#ef4444' }}>
                    Tổng cộng: {new Intl.NumberFormat('vi-VN').format(data.donHang.tongTien)}đ
                </h3>
            </div>
            
            {data.donHang.trangThaiDon === 'DA_GIAO' && (
                <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                    <button onClick={() => navigate(`/review/${id}`)} style={{ flex: 1, padding: '12px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Đánh giá sản phẩm</button>
                    <button onClick={() => navigate(`/return/${id}`)} style={{ flex: 1, padding: '12px', border: '1px solid #ef4444', color: '#ef4444', background: 'none', borderRadius: '8px', cursor: 'pointer' }}>Yêu cầu Đổi/Trả</button>
                </div>
            )}
        </div>
    );
}

export default OrderDetail;