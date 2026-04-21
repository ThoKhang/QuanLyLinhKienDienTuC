import { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import styles from './AdminProduct.module.css'; // Tái sử dụng CSS cũ

function AdminAccount() {
    const [accounts, setAccounts] = useState([]);

    const fetchAccounts = async () => {
        try {
            // Giả định bạn có API này trong Backend
            const res = await axiosClient.get('/admin/tai-khoan');
            setAccounts(res.data);
        } catch (err) { console.error("Lỗi lấy danh sách tài khoản", err); }
    };

    useEffect(() => { fetchAccounts(); }, []);

    const toggleStatus = async (id, currentStatus) => {
        if (window.confirm(`Bạn muốn ${currentStatus ? 'KHÓA' : 'MỞ KHÓA'} tài khoản này?`)) {
            try {
                // Giả định API đổi trạng thái (TrangThaiHoatDong: bit)
                await axiosClient.put(`/admin/tai-khoan/${id}/trang-thai`);
                fetchAccounts();
            } catch (err) { alert("Lỗi khi cập nhật trạng thái!"); }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Quản lý Người Dùng</h1>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.productTable}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên đăng nhập</th>
                            <th>Họ và tên</th>
                            <th>Email</th>
                            <th>Vai trò</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.map(acc => (
                            <tr key={acc.id}>
                                <td>#{acc.id}</td>
                                <td><b>{acc.tenDangNhap}</b></td>
                                <td>{acc.hoTen}</td>
                                <td>{acc.email}</td>
                                <td>
                                    <span style={{ padding: '4px 8px', borderRadius: '4px', background: acc.vaiTro === 'ADMIN' ? '#e0e7ff' : '#f1f5f9', color: acc.vaiTro === 'ADMIN' ? '#4f46e5' : '#475569', fontWeight: 'bold', fontSize: '12px' }}>
                                        {acc.vaiTro}
                                    </span>
                                </td>
                                <td>
                                    <span style={{ color: acc.trangThaiHoatDong ? '#16a34a' : '#dc2626', fontWeight: 'bold' }}>
                                        {acc.trangThaiHoatDong ? '🟢 Hoạt động' : '🔴 Bị khóa'}
                                    </span>
                                </td>
                                <td>
                                    {acc.vaiTro !== 'ADMIN' && (
                                        <button className={styles.btnAction} onClick={() => toggleStatus(acc.id, acc.trangThaiHoatDong)} style={{ color: acc.trangThaiHoatDong ? '#ef4444' : '#10b981', fontWeight: 'bold' }}>
                                            {acc.trangThaiHoatDong ? 'Khóa' : 'Mở khóa'}
                                        </button>
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

export default AdminAccount;