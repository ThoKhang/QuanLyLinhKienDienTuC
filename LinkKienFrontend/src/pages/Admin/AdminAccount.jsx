import { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import styles from './Admin.module.css';

function AdminAccount() {
  const [accounts, setAccounts] = useState([]);
  const [search, setSearch] = useState('');

  const fetchAccounts = async () => {
    try {
      const res = await axiosClient.get('/admin/tai-khoan');
      setAccounts(res.data);
    } catch (err) {
      console.error('Lỗi lấy danh sách tài khoản', err);
    }
  };

  useEffect(() => { fetchAccounts(); }, []);

  const toggleStatus = async (id, currentStatus) => {
    if (window.confirm(`Bạn muốn ${currentStatus ? 'KHÓA' : 'MỞ KHÓA'} tài khoản này?`)) {
      try {
        await axiosClient.put(`/admin/tai-khoan/${id}/trang-thai`);
        fetchAccounts();
      } catch (err) {
        alert('Lỗi khi cập nhật trạng thái!');
      }
    }
  };

  const filtered = accounts.filter(acc =>
    acc.hoTen?.toLowerCase().includes(search.toLowerCase()) ||
    acc.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Quản lý Tài Khoản</h1>
      </div>

      <div className={styles.searchBar}>
        <input
          className={styles.searchInput}
          placeholder="Tìm kiếm theo tên hoặc email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
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
            {filtered.map(acc => (
              <tr key={acc.id}>
                <td style={{ color: 'rgba(0,212,255,0.6)', fontWeight: 600 }}>#{acc.id}</td>
                <td style={{ fontWeight: 600, color: '#e2e8f0' }}>{acc.tenDangNhap}</td>
                <td>{acc.hoTen}</td>
                <td style={{ color: 'rgba(226,232,240,0.6)' }}>{acc.email}</td>
                <td>
                  <span className={acc.vaiTro === 'ADMIN' ? styles.badgeAdmin : styles.badgeUser}>
                    {acc.vaiTro}
                  </span>
                </td>
                <td>
                  {acc.trangThaiHoatDong
                    ? <span className={styles.statusActive}>Hoạt động</span>
                    : <span className={styles.statusLocked}>Bị khóa</span>
                  }
                </td>
                <td>
                  {acc.vaiTro !== 'ADMIN' && (
                    <button
                      className={styles.btnAction}
                      onClick={() => toggleStatus(acc.id, acc.trangThaiHoatDong)}
                      style={acc.trangThaiHoatDong
                        ? { borderColor: 'rgba(255,77,77,0.3)', color: '#f87171' }
                        : {}
                      }
                    >
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