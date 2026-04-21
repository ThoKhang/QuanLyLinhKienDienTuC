import { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';

function AdminOrder() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const res = await axiosClient.get('/don-hang/admin/tat-ca');
            setOrders(res.data);
        } catch (err) {
            console.error("Lỗi lấy danh sách đơn hàng:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchOrders(); }, []);

    // HÀM DỊCH THUẬT: Chuyển mã code thành Tiếng Việt thân thiện
    const vietsubStatus = (status) => {
        switch(status) {
            case 'CHO_XAC_NHAN': return 'Chờ xác nhận';
            case 'DANG_GIAO': return 'Đang giao hàng';
            case 'DA_GIAO': return 'Đã giao thành công';
            case 'DA_HUY': return 'Đã hủy';
            default: return status;
        }
    };

    // Hàm gọi API cập nhật trạng thái
    const handleUpdateStatus = async (orderId, newStatus) => {
        try {
            await axiosClient.put(`/don-hang/admin/cap-nhat-trang-thai/${orderId}?trangThaiMoi=${newStatus}`);
            alert("Đã cập nhật trạng thái đơn hàng!");
            fetchOrders(); // Tải lại bảng
        } catch (error) {
            alert("Lỗi khi cập nhật trạng thái!");
        }
    };

    if (loading) return <div style={{padding: '20px'}}>Đang tải danh sách đơn hàng...</div>;

    return (
        <div style={{ padding: '20px', background: 'white', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <h2 style={{ color: '#1e293b', marginBottom: '20px' }}>Quản lý Đơn hàng</h2>
            
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                    <tr style={{ background: '#f1f5f9', color: '#475569', borderBottom: '2px solid #cbd5e1' }}>
                        <th style={{ padding: '12px' }}>Mã Đơn</th>
                        <th style={{ padding: '12px' }}>Khách hàng</th>
                        <th style={{ padding: '12px' }}>Ngày đặt</th>
                        <th style={{ padding: '12px' }}>Tổng tiền</th>
                        <th style={{ padding: '12px' }}>Thanh toán</th>
                        <th style={{ padding: '12px' }}>Trạng thái</th>
                        <th style={{ padding: '12px' }}>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length === 0 ? (
                        <tr><td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>Chưa có đơn hàng nào.</td></tr>
                    ) : (
                        orders.map(order => (
                            <tr key={order.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                <td style={{ padding: '12px', fontWeight: 'bold' }}>#{order.id}</td>
                                <td style={{ padding: '12px' }}>{order.nguoiDung?.hoTen || 'Khách vãng lai'}</td>
                                <td style={{ padding: '12px' }}>{new Date(order.ngayDat).toLocaleDateString('vi-VN')}</td>
                                <td style={{ padding: '12px', color: '#ef4444', fontWeight: 'bold' }}>
                                    {new Intl.NumberFormat('vi-VN').format(order.tongTien)}đ
                                </td>
                                <td style={{ padding: '12px' }}>
                                    {order.phuongThucThanhToan === 'TIEN_MAT' ? 'Tiền mặt' : 'Chuyển khoản'}
                                </td>
                                
                                {/* CỘT TRẠNG THÁI (Đã Vietsub) */}
                                <td style={{ padding: '12px', fontWeight: 'bold', 
                                    color: order.trangThaiDon === 'CHO_XAC_NHAN' ? '#d97706' : 
                                           order.trangThaiDon === 'DANG_GIAO' ? '#2563eb' : 
                                           order.trangThaiDon === 'DA_GIAO' ? '#059669' : '#dc2626'
                                }}>
                                    {vietsubStatus(order.trangThaiDon)}
                                </td>

                                {/* CỘT HÀNH ĐỘNG (Dropdown thay đổi trạng thái) */}
                                <td style={{ padding: '12px' }}>
                                    <select 
                                        style={{ padding: '6px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none' }}
                                        value={order.trangThaiDon}
                                        onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                                    >
                                        <option value="CHO_XAC_NHAN">Chờ xác nhận</option>
                                        <option value="DANG_GIAO">Đang giao hàng</option>
                                        <option value="DA_GIAO">Đã giao thành công</option>
                                        <option value="DA_HUY">Hủy đơn</option>
                                    </select>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default AdminOrder;