import { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import styles from './AdminProduct.module.css';

function AdminComment() {
    const [comments, setComments] = useState([]);

    const fetchComments = async () => {
        try {
            const res = await axiosClient.get('/admin/danh-gia');
            setComments(res.data);
        } catch (err) { console.error("Lỗi lấy bình luận", err); }
    };

    useEffect(() => { fetchComments(); }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Xóa vĩnh viễn bình luận này?")) {
            try {
                await axiosClient.delete(`/admin/danh-gia/${id}`);
                fetchComments();
            } catch (err) { alert("Lỗi khi xóa!"); }
        }
    };

    const renderStars = (rating) => "⭐".repeat(rating);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Kiểm duyệt Đánh giá</h1>
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
                        {comments.map(cmt => (
                            <tr key={cmt.id}>
                                <td><b>{cmt.nguoiDung?.hoTen}</b></td>
                                <td>{cmt.sanPham?.tenSanPham}</td>
                                <td>{renderStars(cmt.soSao)}</td>
                                <td style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {cmt.noiDung}
                                </td>
                                <td>{new Date(cmt.ngayTao).toLocaleDateString('vi-VN')}</td>
                                <td>
                                    <button className={styles.btnDelete} onClick={() => handleDelete(cmt.id)}>🗑️ Xóa</button>
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