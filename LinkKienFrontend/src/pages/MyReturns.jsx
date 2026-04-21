import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';

function MyReturns() {
    const [returns, setReturns] = useState([]);

    useEffect(() => {
        axiosClient.get('/doi-tra/lich-su')
            .then(res => setReturns(res.data))
            .catch(err => console.error(err));
    }, []);

    const vietsubStatus = (status) => {
        if(status === 'CHO_DUYET') return <span style={{color: '#d97706'}}>⏳ Chờ xử lý</span>;
        if(status === 'DA_DUYET') return <span style={{color: '#2563eb'}}>✅ Đã duyệt - Đang lấy hàng</span>;
        if(status === 'HOAN_TIEN') return <span style={{color: '#059669'}}>💰 Đã hoàn tiền</span>;
        if(status === 'TU_CHOI') return <span style={{color: '#dc2626'}}>❌ Bị từ chối</span>;
        return status;
    };

    return (
        <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
            <h2>🔄 Lịch sử Đổi trả & Bảo hành</h2>
            {returns.length === 0 ? <p>Bạn chưa có yêu cầu đổi trả nào.</p> : (
                returns.map(item => (
                    <div key={item.id} style={{ background: 'white', padding: '20px', borderRadius: '12px', marginBottom: '15px', borderLeft: '5px solid #dc2626' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px' }}>
                            <b>Mã yêu cầu: #{item.id} (Đơn gốc: #{item.donHang.id})</b>
                            <b>Trạng thái: {vietsubStatus(item.trangThai)}</b>
                        </div>
                        <p><b>Lý do:</b> {item.lyDo}</p>
                        <p><b>Chi tiết:</b> {item.chiTiet}</p>
                        {item.hinhAnh && <img src={item.hinhAnh} alt="bằng chứng" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />}
                    </div>
                ))
            )}
        </div>
    );
}
export default MyReturns;