import { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import styles from './AdminProduct.module.css';

function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    tenSanPham: '', giaBan: '', soLuongTon: '', moTa: '',
    hinhAnh: '', maSanPham: '', danhMucId: 1, chiTietLinhKiens: []
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [search, setSearch] = useState('');

  const fetchProducts = async () => {
    try {
      const res = await axiosClient.get('/public/san-pham');
      setProducts(res.data);
    } catch (err) { console.error('Lỗi lấy dữ liệu:', err); }
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
    setFormData({ ...formData, chiTietLinhKiens: formData.chiTietLinhKiens.filter((_, i) => i !== index) });
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
    if (file) { setSelectedFile(file); setPreviewUrl(URL.createObjectURL(file)); }
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
      alert('Lưu linh kiện thành công!');
      setIsModalOpen(false);
      fetchProducts();
    } catch (err) { console.error(err); alert('Có lỗi xảy ra!'); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Xóa linh kiện này?')) {
      try {
        await axiosClient.delete(`/admin/san-pham/${id}`);
        fetchProducts();
      } catch (err) { alert('Lỗi khi xóa!'); }
    }
  };

  const filtered = products.filter(sp =>
    sp.tenSanPham?.toLowerCase().includes(search.toLowerCase()) ||
    sp.maSanPham?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Kho Linh Kiện KhStore</h1>
        <button className={styles.btnAdd} onClick={() => handleOpenModal()}>+ Thêm Linh Kiện</button>
      </div>

      <div className={styles.searchBar}>
        <input
          className={styles.searchInput}
          placeholder="Tìm theo tên hoặc mã sản phẩm..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.productTable}>
          <thead>
            <tr>
              <th>Ảnh</th>
              <th>Mã SP</th>
              <th>Tên sản phẩm</th>
              <th>Giá bán</th>
              <th>Tồn kho</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(sp => (
              <tr key={sp.id}>
                <td><img src={sp.hinhAnh} className={styles.imgPreview} alt="" /></td>
                <td style={{ color: 'rgba(0,212,255,0.7)', fontWeight: 600, fontSize: 12, letterSpacing: '0.5px' }}>
                  {sp.maSanPham}
                </td>
                <td style={{ fontWeight: 500, color: '#e2e8f0' }}>{sp.tenSanPham}</td>
                <td style={{ color: '#fbbf24', fontWeight: 600 }}>
                  {new Intl.NumberFormat('vi-VN').format(sp.giaBan)}₫
                </td>
                <td>
                  <span className={`${styles.statusBadge} ${sp.soLuongTon > 0 ? styles.inStock : styles.outStock}`}>
                    {sp.soLuongTon > 0 ? `${sp.soLuongTon} cái` : 'Hết hàng'}
                  </span>
                </td>
                <td>
                  <button className={styles.btnEdit} onClick={() => handleOpenModal(sp)}>✏️ Sửa</button>
                  <button className={styles.btnDelete} onClick={() => handleDelete(sp.id)}>🗑️ Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal} style={{ maxHeight: '90vh', overflowY: 'auto' }}>
            <h2>{editingProduct ? 'Cập nhật Linh Kiện' : 'Thêm Linh Kiện Mới'}</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Mã sản phẩm" value={formData.maSanPham}
                onChange={e => setFormData({ ...formData, maSanPham: e.target.value })} required />
              <input type="text" placeholder="Tên linh kiện" value={formData.tenSanPham}
                onChange={e => setFormData({ ...formData, tenSanPham: e.target.value })} required />
              <div style={{ display: 'flex', gap: '10px' }}>
                <input style={{ flex: 1 }} type="number" placeholder="Giá bán (₫)" value={formData.giaBan}
                  onChange={e => setFormData({ ...formData, giaBan: e.target.value })} required />
                <input style={{ flex: 1 }} type="number" placeholder="Số lượng tồn" value={formData.soLuongTon}
                  onChange={e => setFormData({ ...formData, soLuongTon: e.target.value })} required />
              </div>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: 'rgba(0,212,255,0.7)', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>
                    Hình ảnh
                  </div>
                  <input type="file" accept="image/*" onChange={handleFileChange} />
                </div>
                {previewUrl && (
                  <img src={previewUrl} alt="Preview"
                    style={{ width: 56, height: 56, borderRadius: 8, objectFit: 'cover', border: '1px solid rgba(0,212,255,0.25)', flexShrink: 0 }} />
                )}
              </div>
              <textarea placeholder="Mô tả sản phẩm" value={formData.moTa}
                onChange={e => setFormData({ ...formData, moTa: e.target.value })} />

              <div className={styles.specBox}>
                <div className={styles.specBoxHeader}>
                  <span className={styles.specBoxTitle}>Thông số kỹ thuật</span>
                  <button type="button" className={styles.btnAddSpec} onClick={handleAddSpec}>+ Thêm</button>
                </div>
                {formData.chiTietLinhKiens.map((spec, index) => (
                  <div key={index} className={styles.specRow}>
                    <input type="text" placeholder="Tên thông số" value={spec.tenThongSo}
                      onChange={e => handleSpecChange(index, 'tenThongSo', e.target.value)} required />
                    <input type="text" placeholder="Giá trị" value={spec.giaTri}
                      onChange={e => handleSpecChange(index, 'giaTri', e.target.value)} required />
                    <button type="button" className={styles.btnRemoveSpec} onClick={() => handleRemoveSpec(index)}>✕</button>
                  </div>
                ))}
              </div>

              <div className={styles.modalActions}>
                <button type="submit" className={styles.btnSave}>💾 Lưu</button>
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