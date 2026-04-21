import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';

function Review() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [sanPhams, setSanPhams] = useState([]); // Chứa danh sách SP trong đơn
    const [selectedSp, setSelectedSp] = useState('');
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [imageBase64, setImageBase64] = useState(null);

    // Lấy chi tiết đơn hàng để biết trong đó có sản phẩm gì
    useEffect(() => {
        axiosClient.get(`/don-hang/chi-tiet/${id}`)
            .then(res => {
                setSanPhams(res.data.sanPhams);
                if (res.data.sanPhams.length > 0) setSelectedSp(res.data.sanPhams[0].sanPham.id);
            })
            .catch(err => console.error(err));
    }, [id]);

    // Chuyển file ảnh thành chuỗi Base64 để lưu thẳng vào Database dễ dàng
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
            await axiosClient.post('/danh-gia/them', {
                donHangId: id,
                sanPhamId: selectedSp,
                soSao: rating,
                noiDung: comment,
                hinhAnh: imageBase64 // Lưu chuỗi ảnh vào DB
            });
            alert("Đã lưu đánh giá thành công! Sản phẩm đã được cập nhật đánh giá.");
            navigate('/my-orders');
        } catch (error) { alert("Lỗi khi gửi đánh giá!"); }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '40px auto', padding: '30px', background: 'white', borderRadius: '12px' }}>
            <h2>Đánh giá Đơn hàng #{id}</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ fontWeight: 'bold' }}>Chọn sản phẩm muốn đánh giá:</label>
                    <select style={{ width: '100%', padding: '10px', marginTop: '5px' }} value={selectedSp} onChange={e => setSelectedSp(e.target.value)}>
                        {sanPhams.map(item => (
                            <option key={item.sanPham.id} value={item.sanPham.id}>{item.sanPham.tenSanPham}</option>
                        ))}
                    </select>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ fontWeight: 'bold' }}>Đánh giá sao:</label>
                    <select style={{ width: '100%', padding: '10px', marginTop: '5px' }} value={rating} onChange={e => setRating(e.target.value)}>
                        {[5,4,3,2,1].map(num => <option key={num} value={num}>{num} Sao</option>)}
                    </select>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ fontWeight: 'bold' }}>Nhận xét chi tiết:</label>
                    <textarea rows="4" style={{ width: '100%', padding: '10px', marginTop: '5px' }} value={comment} onChange={e => setComment(e.target.value)} required />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontWeight: 'bold' }}>Thêm hình ảnh thực tế (nếu có):</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'block', marginTop: '5px' }} />
                    {imageBase64 && <img src={imageBase64} alt="Preview" style={{ width: '100px', marginTop: '10px', borderRadius: '8px' }} />}
                </div>

                <button type="submit" style={{ width: '100%', padding: '15px', background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Lưu Đánh Giá</button>
            </form>
        </div>
    );
}
export default Review;