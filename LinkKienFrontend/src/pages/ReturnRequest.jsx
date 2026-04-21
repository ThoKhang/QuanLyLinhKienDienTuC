import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';

function ReturnRequest() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [lyDo, setLyDo] = useState('');
    const [chiTiet, setChiTiet] = useState('');
    const [imageBase64, setImageBase64] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImageBase64(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosClient.post('/doi-tra/gui-yeu-cau', {
                donHangId: id,
                lyDo: lyDo,
                chiTiet: chiTiet,
                hinhAnh: imageBase64 // Gửi ảnh bằng chứng về DB
            });
            alert(`Đã gửi yêu cầu đổi trả thành công! Hệ thống chuyển bạn tới trang Theo dõi.`);
            navigate('/my-returns'); // Chuyển thẳng tới trang Lịch sử đổi trả
        } catch (error) { alert("Có lỗi xảy ra, vui lòng thử lại sau!"); }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '40px auto', padding: '30px', background: 'white', borderRadius: '12px' }}>
            <h2>Gửi yêu cầu Đổi/Trả cho đơn #{id}</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Lý do chính:</label>
                    <select required style={{ width: '100%', padding: '10px' }} value={lyDo} onChange={e => setLyDo(e.target.value)}>
                        <option value="">-- Chọn lý do --</option>
                        <option value="Hàng lỗi kĩ thuật">Hàng lỗi kĩ thuật</option>
                        <option value="Giao sai sản phẩm">Giao sai sản phẩm</option>
                        <option value="Vỡ, hỏng do vận chuyển">Vỡ, hỏng do vận chuyển</option>
                    </select>
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Mô tả chi tiết:</label>
                    <textarea required rows="4" style={{ width: '100%', padding: '10px' }} value={chiTiet} onChange={e => setChiTiet(e.target.value)} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label>Ảnh bằng chứng (Bắt buộc):</label>
                    <input required type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'block' }} />
                    {imageBase64 && <img src={imageBase64} alt="Preview" style={{ width: '100px', marginTop: '10px' }} />}
                </div>
                <button type="submit" style={{ width: '100%', padding: '15px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '8px' }}>Gửi Yêu Cầu</button>
            </form>
        </div>
    );
}
export default ReturnRequest;