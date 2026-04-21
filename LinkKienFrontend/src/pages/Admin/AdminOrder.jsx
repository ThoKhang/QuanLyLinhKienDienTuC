import { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import styles from './AdminProduct.module.css';

function AdminOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');

  const fetchOrders = async () => {
    try {
      const res = await axiosClient.get('/don-hang/admin/tat-ca');
      setOrders(res.data);
    } catch (err) {
      console.error('Lỗi lấy danh sách đơn hàng:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const statusConfig = {
    CHO_XAC_NHAN: { label: 'Chờ xác nhận', color: '#fbbf24', bg: 'rgba(251,191,36,0.1)', border: 'rgba(251,191,36,0.2)' },
    DANG_GIAO:    { label: 'Đang giao',     color: '#60a5fa', bg: 'rgba(96,165,250,0.1)',  border: 'rgba(96,165,250,0.2)' },
    DA_GIAO:      { label: 'Đã giao',        color: '#4ade80', bg: 'rgba(74,222,128,0.1)',  border: 'rgba(74,222,128,0.2)' },
    DA_HUY:       { label: 'Đã hủy',         color: '#f87171', bg: 'rgba(248,113,113,0.1)', border: 'rgba(248,113,113,0.2)' },
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await axiosClient.put(`/don-hang/admin/cap-nhat-trang-thai/${orderId}?trangThaiMoi=${newStatus}`);
      fetchOrders();
    } catch {
      alert('Lỗi khi cập nhật trạng thái!');
    }
  };

  const filtered = orders.filter(o => {
    const matchSearch =
      String(o.id).includes(search) ||
      o.nguoiDung?.hoTen?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'ALL' || o.trangThaiDon === filterStatus;
    return matchSearch && matchStatus;
  });

  if (loading) return (
    <div style={{ padding: 40, textAlign: 'center', color: 'rgba(0,212,255,0.6)', fontFamily: 'Inter,sans-serif', letterSpacing: '1px' }}>
      Đang tải dữ liệu...
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Quản lý Đơn Hàng</h1>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        {[['ALL', 'Tất cả'], ...Object.entries(statusConfig).map(([k, v]) => [k, v.label])].map(([val, label]) => (
          <button
            key={val}
            onClick={() => setFilterStatus(val)}
            style={{
              padding: '6px 14px',
              borderRadius: 6,
              border: filterStatus === val ? '1px solid rgba(0,212,255,0.5)' : '1px solid rgba(0,212,255,0.12)',
              background: filterStatus === val ? 'rgba(0,212,255,0.12)' : 'transparent',
              color: filterStatus === val ? '#00d4ff' : 'rgba(226,232,240,0.5)',
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.5px',
              transition: 'all 0.2s',
              fontFamily: 'Inter,sans-serif',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div className={styles.searchBar}>
        <input
          className={styles.searchInput}
          placeholder="Tìm theo mã đơn hoặc tên khách hàng..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.productTable}>
          <thead>
            <tr>
              <th>Mã đơn</th>
              <th>Khách hàng</th>
              <th>Ngày đặt</th>
              <th>Tổng tiền</th>
              <th>Thanh toán</th>
              <th>Trạng thái</th>
              <th>Cập nhật</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: 32, color: 'rgba(226,232,240,0.3)', fontSize: 14 }}>
                  Không có đơn hàng nào.
                </td>
              </tr>
            ) : (
              filtered.map(order => {
                const cfg = statusConfig[order.trangThaiDon] || { label: order.trangThaiDon, color: '#e2e8f0', bg: 'transparent', border: 'rgba(255,255,255,0.1)' };
                return (
                  <tr key={order.id}>
                    <td style={{ color: 'rgba(0,212,255,0.7)', fontWeight: 700, fontSize: 13 }}>
                      #{order.id}
                    </td>
                    <td style={{ fontWeight: 500, color: '#e2e8f0' }}>
                      {order.nguoiDung?.hoTen || 'Khách vãng lai'}
                    </td>
                    <td style={{ color: 'rgba(226,232,240,0.55)', fontSize: 13 }}>
                      {new Date(order.ngayDat).toLocaleDateString('vi-VN')}
                    </td>
                    <td style={{ color: '#fbbf24', fontWeight: 700 }}>
                      {new Intl.NumberFormat('vi-VN').format(order.tongTien)}₫
                    </td>
                    <td>
                      <span style={{
                        display: 'inline-block',
                        padding: '3px 10px',
                        borderRadius: 4,
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase',
                        background: order.phuongThucThanhToan === 'TIEN_MAT'
                          ? 'rgba(251,191,36,0.1)' : 'rgba(96,165,250,0.1)',
                        color: order.phuongThucThanhToan === 'TIEN_MAT' ? '#fbbf24' : '#60a5fa',
                        border: `1px solid ${order.phuongThucThanhToan === 'TIEN_MAT' ? 'rgba(251,191,36,0.2)' : 'rgba(96,165,250,0.2)'}`,
                      }}>
                        {order.phuongThucThanhToan === 'TIEN_MAT' ? 'Tiền mặt' : 'Chuyển khoản'}
                      </span>
                    </td>
                    <td>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '4px 10px',
                        borderRadius: 4,
                        fontSize: 12,
                        fontWeight: 600,
                        background: cfg.bg,
                        color: cfg.color,
                        border: `1px solid ${cfg.border}`,
                        whiteSpace: 'nowrap',
                      }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: cfg.color, flexShrink: 0, boxShadow: order.trangThaiDon === 'DANG_GIAO' ? `0 0 6px ${cfg.color}` : 'none' }} />
                        {cfg.label}
                      </span>
                    </td>
                    <td>
                      <select
                        value={order.trangThaiDon}
                        onChange={e => handleUpdateStatus(order.id, e.target.value)}
                        style={{
                          padding: '7px 10px',
                          borderRadius: 7,
                          border: '1px solid rgba(0,212,255,0.2)',
                          background: 'rgba(0,212,255,0.05)',
                          color: '#e2e8f0',
                          fontSize: 12,
                          fontFamily: 'Inter,sans-serif',
                          outline: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        <option value="CHO_XAC_NHAN">Chờ xác nhận</option>
                        <option value="DANG_GIAO">Đang giao hàng</option>
                        <option value="DA_GIAO">Đã giao thành công</option>
                        <option value="DA_HUY">Hủy đơn</option>
                      </select>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminOrder;