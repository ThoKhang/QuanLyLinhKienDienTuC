import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';

function Review() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Giả lập gửi thông tin đánh giá
        alert("Cảm ơn Khang đã đánh giá sản phẩm!");
        navigate('/my-orders');
    };

    return (
        <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', background: 'white', borderRadius: '12px' }}>
            <h2>Đánh giá đơn hàng #{id}</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Số sao: </label>
                    <select value={rating} onChange={e => setRating(e.target.value)}>
                        {[5,4,3,2,1].map(num => <option key={num} value={num}>{num} sao</option>)}
                    </select>
                </div>
                <textarea 
                    placeholder="Chia sẻ cảm nhận của bạn về sản phẩm..."
                    style={{ width: '100%', height: '100px', marginBottom: '15px', padding: '10px' }}
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                />
                <input type="file" onChange={e => setImage(e.target.files[0])} style={{ marginBottom: '15px' }} />
                <button type="submit" style={{ width: '100%', padding: '12px', background: '#10b981', color: 'white', border: 'none', borderRadius: '8px' }}>Gửi đánh giá</button>
            </form>
        </div>
    );
}

export default Review;