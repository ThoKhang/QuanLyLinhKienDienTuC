import { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import styles from './AdminProduct.module.css';

function AdminProduct() {
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        tenSanPham: '', giaBan: '', soLuongKho: '', moTa: '', hinhAnh: '', maSanPham: '', danhMucId: 1
    });

    // 1. THÊM STATE ĐỂ LƯU FILE ẢNH VÀ PREVIEW
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');

    const fetchProducts = async () => {
        try {
            const res = await axiosClient.get('/public/san-pham');
            setProducts(res.data);
        } catch (err) { console.error("Lỗi lấy dữ liệu:", err); }
    };

    useEffect(() => { fetchProducts(); }, []);

    // 2. HÀM MỞ MODAL (Có dọn dẹp ảnh cũ)
    const handleOpenModal = (product = null) => {
        setSelectedFile(null); // Xóa file đang chọn trong bộ nhớ
        if (product) {
            setEditingProduct(product);
            setFormData({ ...product, danhMucId: product.danhMuc?.id || 1 });
            setPreviewUrl(product.hinhAnh); // Load ảnh cũ lên preview
        } else {
            setEditingProduct(null);
            setFormData({ tenSanPham: '', giaBan: '', soLuongKho: '', moTa: '', hinhAnh: '', maSanPham: '', danhMucId: 1 });
            setPreviewUrl(''); // Làm trống preview
        }
        setIsModalOpen(true);
    };

    // 3. HÀM BẮT SỰ KIỆN KHI NGƯỜI DÙNG CHỌN FILE
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file)); // Tạo link tạm để xem trước ảnh ngay lập tức
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let finalImageUrl = formData.hinhAnh;

            // BƯỚC 1: Gọi API upload ảnh từ Backend của Khang
            if (selectedFile) {
                const uploadData = new FormData();
                uploadData.append('file', selectedFile);
                
                const uploadRes = await axiosClient.post('/admin/upload', uploadData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                
                finalImageUrl = uploadRes.data; 
            }

            // BƯỚC 2: Gom link ảnh vào data và gửi lưu Sản phẩm
            const payload = { ...formData, hinhAnh: finalImageUrl };

            if (editingProduct) {
                await axiosClient.put(`/admin/san-pham/${editingProduct.id}`, payload);
            } else {
                await axiosClient.post(`/admin/san-pham?danhMucId=${payload.danhMucId}`, payload);
            }
            
            alert("Lưu linh kiện thành công!");
            setIsModalOpen(false);
            fetchProducts();
        } catch (err) { 
            console.error(err);
            alert("Có lỗi xảy ra, kiểm tra Console nhé!"); 
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Xóa linh kiện này?")) {
            try {
                await axiosClient.delete(`/admin/san-pham/${id}`);
                fetchProducts();
            } catch (err) { alert("Lỗi khi xóa!"); }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Kho Linh Kiện KhStore</h1>
                <button className={styles.btnAdd} onClick={() => handleOpenModal()}>+ Thêm Linh Kiện</button>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.productTable}>
                    <thead>
                        <tr>
                            <th>Ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Giá</th>
                            <th>Kho</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(sp => (
                            <tr key={sp.id}>
                                <td><img src={sp.hinhAnh} className={styles.imgPreview} alt="" /></td>
                                <td>{sp.tenSanPham}</td>
                                <td>{new Intl.NumberFormat('vi-VN').format(sp.giaBan)}đ</td>
                                <td>{sp.soLuongKho || 0}</td>
                                <td>
                                    <button className={styles.btnEdit} onClick={() => handleOpenModal(sp)}>✏️</button>
                                    <button className={styles.btnDelete} onClick={() => handleDelete(sp.id)}>🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MODAL THÊM/SỬA */}
            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h2>{editingProduct ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm mới'}</h2>
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder="Tên linh kiện" value={formData.tenSanPham} onChange={e => setFormData({...formData, tenSanPham: e.target.value})} required />
                            <input type="number" placeholder="Giá bán" value={formData.giaBan} onChange={e => setFormData({...formData, giaBan: e.target.value})} required />
                            
                            {/* ĐÃ THAY ĐỔI: VÙNG CHỌN ẢNH VÀ XEM TRƯỚC */}
                            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#475569' }}>
                                        Hình ảnh linh kiện
                                    </label>
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={handleFileChange} 
                                        style={{ width: '100%', padding: '8px', border: '1px dashed #cbd5e1', borderRadius: '8px' }} 
                                    />
                                </div>
                                {previewUrl && (
                                    <img 
                                        src={previewUrl} 
                                        alt="Preview" 
                                        style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #e2e8f0' }} 
                                    />
                                )}
                            </div>

                            <textarea placeholder="Mô tả chi tiết" value={formData.moTa} onChange={e => setFormData({...formData, moTa: e.target.value})} />
                            
                            <div className={styles.modalActions}>
                                <button type="submit" className={styles.btnSave}>Lưu lại</button>
                                <button type="button" className={styles.btnCancel} onClick={() => setIsModalOpen(false)}>Hủy</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminProduct;