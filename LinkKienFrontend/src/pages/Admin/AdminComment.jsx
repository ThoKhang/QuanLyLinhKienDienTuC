import { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import styles from './Admin.module.css';

function AdminComment() {
  const [comments, setComments] = useState([]);
  const [search, setSearch] = useState('');

  const fetchComments = async () => {
    try {
      const res = await axiosClient.get('/admin/danh-gia');
      setComments(res.data);
    } catch (err) {
      console.error('Lỗi lấy bình luận', err);
    }
  };

  useEffect(() => { fetchComments(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Xóa vĩnh viễn đánh giá này?')) {
      try {
        await axiosClient.delete(`/admin/danh-gia/${id}`);
        fetchComments();
      } catch (err) {
        alert('Lỗi khi xóa!');
      }
    }
  };

  const renderStars = (rating) => {
    return (
      <span style={{ color: '#fbbf24', letterSpacing: '2px', fontSize: 13 }}>
        {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
      </span>
    );
  };

  const filtered = comments.filter(cmt =>
    cmt.nguoiDung?.hoTen?.toLowerCase().includes(search.toLowerCase()) ||
    cmt.sanPham?.tenSanPham?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Kiểm duyệt Đánh Giá</h1>
      </div>

      <div className={styles.searchBar}>
        <input
          className={styles.searchInput}
          placeholder="Tìm theo khách hàng hoặc sản phẩm..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.productTable}>
          <thead>
            <tr>
              <th>Khách hàng</th>
              <th>Sản phẩm</th>
              <th>Đánh giá</th>
              <th>Nội dung</th>
              <th>Ngày đăng</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(cmt => (
              <tr key={cmt.id}>
                <td style={{ fontWeight: 600, color: '#e2e8f0' }}>{cmt.nguoiDung?.hoTen}</td>
                <td style={{ color: 'rgba(0,212,255,0.8)' }}>{cmt.sanPham?.tenSanPham}</td>
                <td>{renderStars(cmt.soSao)}</td>
                <td style={{
                  maxWidth: '280px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color: 'rgba(226,232,240,0.6)'
                }}>
                  {cmt.noiDung}
                </td>
                <td style={{ color: 'rgba(226,232,240,0.5)', fontSize: 13 }}>
                  {new Date(cmt.ngayTao).toLocaleDateString('vi-VN')}
                </td>
                <td>
                  <button className={styles.btnDelete} onClick={() => handleDelete(cmt.id)}>
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminComment;