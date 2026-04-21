import { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import styles from './AdminProduct.module.css';

function AdminProduct() {
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({ tenSanPham: '', giaBan: '', soLuongTon: '', moTa: '', hinhAnh: '', maSanPham: '', danhMucId: 1, chiTietLinhKiens: [] });
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');

    const fetchProducts = async () => {
        try {
            const res = await axiosClient.get('/public/san-pham');
            setProducts(res.data);
        } catch (err) { console.error("Lỗi lấy dữ liệu:", err); }
    };

    useEffect(() => { fetchProducts(); }, []);

    const handleAddSpec = () => {
        setFormData({ ...formData, chiTietLinhKiens: [...formData.chiTietLinhKiens, { tenThongSo: '', giaTri: '' }] });
    };

    const handleSpecChange = (index, field, value) => {
        const newSpecs = [...formData.chiTietLinhKiens];
        newSpecs[index][field] = value;
        setFormData({ ...formData, chiTietLinhKiens: newSpecs });
    };

    const handleRemoveSpec = (index) => {
        const newSpecs = formData.chiTietLinhKiens.filter((_, i) => i !== index);
        setFormData({ ...formData, chiTietLinhKiens: newSpecs });
    };

    const handleOpenModal = (product = null) => {
        setSelectedFile(null); 
        if (product) {
            setEditingProduct(product);
            setFormData({ ...product, danhMucId: product.danhMuc?.id || 1, chiTietLinhKiens: product.chiTietLinhKiens || [] });
            setPreviewUrl(product.hinhAnh); 
        } else {
            setEditingProduct(null);
            setFormData({ tenSanPham: '', giaBan: '', soLuongTon: '', moTa: '', hinhAnh: '', maSanPham: '', danhMucId: 1, chiTietLinhKiens: [] });
            setPreviewUrl(''); 
        }
        setIsModalOpen(true);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file)); 
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let finalImageUrl = formData.hinhAnh;
            if (selectedFile) {
                const uploadData = new FormData();
                uploadData.append('file', selectedFile);
                const uploadRes = await axiosClient.post('/admin/upload', uploadData, { headers: { 'Content-Type': 'multipart/form-data' } });
                finalImageUrl = uploadRes.data; 
            }
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
            alert("Có lỗi xảy ra!"); 
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
                    {/* QUAN TRỌNG: Loại bỏ khoảng trắng giữa các thẻ để hết lỗi Console */}
                    <tbody>
                        {products.map(sp => (
                            <tr key={sp.id}>
                                <td><img src={sp.hinhAnh} className={styles.imgPreview} alt="" /></td>
                                <td>{sp.tenSanPham}</td>
                                <td>{new Intl.NumberFormat('vi-VN').format(sp.giaBan)}đ</td>
                                <td>{sp.soLuongTon || 0}</td>
                                <td>
                                    <button className={styles.btnEdit} onClick={() => handleOpenModal(sp)}>✏️</button>
                                    <button className={styles.btnDelete} onClick={() => handleDelete(sp.id)}>🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal} style={{ width: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <h2>{editingProduct ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm mới'}</h2>
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder="Mã sản phẩm" value={formData.maSanPham} onChange={e => setFormData({...formData, maSanPham: e.target.value})} required />
                            <input type="text" placeholder="Tên linh kiện" value={formData.tenSanPham} onChange={e => setFormData({...formData, tenSanPham: e.target.value})} required />
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <input style={{ flex: 1 }} type="number" placeholder="Giá bán" value={formData.giaBan} onChange={e => setFormData({...formData, giaBan: e.target.value})} required />
                                <input style={{ flex: 1 }} type="number" placeholder="Số lượng tồn" value={formData.soLuongTon} onChange={e => setFormData({...formData, soLuongTon: e.target.value})} required />
                            </div>
                            <div style={{ display: 'flex', gap: '15px', alignItems: 'center', margin: '10px 0' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px' }}>Hình ảnh</label>
                                    <input type="file" accept="image/*" onChange={handleFileChange} />
                                </div>
                                {previewUrl && <img src={previewUrl} alt="Preview" style={{ width: '50px', height: '50px', borderRadius: '4px' }} />}
                            </div>
                            <textarea placeholder="Mô tả" value={formData.moTa} onChange={e => setFormData({...formData, moTa: e.target.value})} />
                            <div style={{ padding: '10px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', marginTop: '10px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <b>Thông số kỹ thuật</b>
                                    <button type="button" onClick={handleAddSpec} style={{ background: '#4f46e5', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>+ Thêm</button>
                                </div>
                                {formData.chiTietLinhKiens.map((spec, index) => (
                                    <div key={index} style={{ display: 'flex', gap: '5px', marginBottom: '5px' }}>
                                        <input type="text" placeholder="Tên" value={spec.tenThongSo} onChange={(e) => handleSpecChange(index, 'tenThongSo', e.target.value)} required />
                                        <input type="text" placeholder="Giá trị" value={spec.giaTri} onChange={(e) => handleSpecChange(index, 'giaTri', e.target.value)} required />
                                        <button type="button" onClick={() => handleRemoveSpec(index)} style={{ background: '#ef4444', color: 'white', border: 'none', cursor: 'pointer' }}>X</button>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.modalActions} style={{ marginTop: '20px' }}>
                                <button type="submit" className={styles.btnSave}>Lưu</button>
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