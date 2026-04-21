import { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import styles from './AdminProduct.module.css';

function AdminReturn() {
    const [returns, setReturns] = useState([]);

    const fetchReturns = async () => {
        try {
            const res = await axiosClient.get('/admin/doi-tra');
            setReturns(res.data);
        } catch (err) { console.error("Lỗi lấy danh sách đổi trả", err); }
    };

    useEffect(() => { fetchReturns(); }, []);

    const handleUpdateStatus = async (id, status) => {
        if (window.confirm(`Xác nhận chuyển trạng thái thành: ${status}?`)) {
            try {
                await axiosClient.put(`/admin/doi-tra/${id}?trangThai=${status}`);
                fetchReturns();
            } catch (err) { alert("Lỗi cập nhật!"); }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Yêu cầu Đổi trả / Bảo hành</h1>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.productTable}>
                    <thead>
                        <tr>
                            <th>Mã Đơn</th>
                            <th>Khách hàng</th>
                            <th>Lý do</th>
                            <th>Trạng thái</th>
                            <th>Ngày YC</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {returns.map(req => (
                            <tr key={req.id}>
                                <td><b>#{req.donHang?.id}</b></td>
                                <td>{req.nguoiDung?.hoTen}</td>
                                <td style={{ color: '#ef4444', fontWeight: 'bold' }}>{req.lyDo}</td>
                                <td>
                                    <span style={{ 
                                        padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold',
                                        background: req.trangThai === 'DA_DUYET' ? '#dcfce7' : req.trangThai === 'TU_CHOI' ? '#fee2e2' : '#fef3c7',
                                        color: req.trangThai === 'DA_DUYET' ? '#166534' : req.trangThai === 'TU_CHOI' ? '#991b1b' : '#92400e'
                                    }}>
                                        {req.trangThai === 'CHO_XU_LY' ? 'Chờ xử lý' : req.trangThai === 'DA_DUYET' ? 'Đã duyệt' : 'Từ chối'}
                                    </span>
                                </td>
                                <td>{new Date(req.ngayTao).toLocaleDateString('vi-VN')}</td>
                                <td>
                                    {req.trangThai === 'CHO_XU_LY' && (
                                        <div style={{ display: 'flex', gap: '5px' }}>
                                            <button onClick={() => handleUpdateStatus(req.id, 'DA_DUYET')} style={{ background: '#10b981', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>✓ Duyệt</button>
                                            <button onClick={() => handleUpdateStatus(req.id, 'TU_CHOI')} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>✕ Hủy</button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminReturn;