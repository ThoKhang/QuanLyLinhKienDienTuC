import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';

function Checkout() {
    const [user, setUser] = useState({});
    const [cart, setCart] = useState([]);
    const [formData, setFormData] = useState({ diaChiGiaoHang: '', phuongThucThanhToan: 'TIEN_MAT', ghiChu: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Lấy thông tin user để tự động điền địa chỉ
                const resUser = await axiosClient.get('/user/profile');
                setUser(resUser.data);
                setFormData(prev => ({ ...prev, diaChiGiaoHang: resUser.data.diaChi || '' }));

                // 2. Lấy giỏ hàng để tính tiền
                const resCart = await axiosClient.get('/gio-hang');
                if (resCart.data.length === 0) navigate('/cart'); // Nếu xóa sạch giỏ thì đẩy về trang cart
                setCart(resCart.data);
            } catch (error) { 
                console.error("Lỗi:", error); 
            }
        };
        fetchData();
    }, [navigate]);

    const tongTien = cart.reduce((t, item) => t + (item.sanPham.giaBan * item.soLuong), 0);

    const handleDatHang = async (e) => {
        e.preventDefault();
        if (!formData.diaChiGiaoHang) { alert("Vui lòng nhập địa chỉ giao hàng!"); return; }

        try {
            // Gọi API Đặt hàng mà Khang vừa làm ở Backend
            await axiosClient.post('/don-hang/thanh-toan', formData);
            alert("🎉 Đặt hàng thành công! Đơn hàng của bạn đang được xử lý.");
            window.dispatchEvent(new Event('cartUpdated')); // Reset số lượng giỏ về 0 trên Header
            navigate('/my-orders'); // Chuyển sang lịch sử mua hàng
        } catch (error) {
            alert(error.response?.data || "Lỗi khi đặt hàng");
        }
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '40px auto', display: 'flex', gap: '30px', padding: '0 20px', flexWrap: 'wrap' }}>
            {/* CỘT TRÁI: FORM ĐIỀN THÔNG TIN */}
            <div style={{ flex: '2', minWidth: '300px', background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                <h2 style={{ marginTop: 0, color: '#1e293b' }}>Thông tin giao hàng</h2>
                <form id="checkout-form" onSubmit={handleDatHang}>
                    <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                        <p style={{ margin: '0 0 5px 0' }}><b>Người nhận:</b> {user.hoTen}</p>
                        <p style={{ margin: 0 }}><b>Điện thoại:</b> {user.soDienThoai || <span style={{color: 'red'}}>Chưa cập nhật - Vui lòng ghi chú thêm!</span>}</p>
                    </div>
                    
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Địa chỉ nhận hàng (Bắt buộc):</label>
                        <textarea 
                            required
                            rows="3"
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' }}
                            value={formData.diaChiGiaoHang} 
                            placeholder="Nhập số nhà, tên đường, phường/xã, quận/huyện..."
                            onChange={e => setFormData({...formData, diaChiGiaoHang: e.target.value})}
                        />
                    </div>

                    <div style={{ marginBottom: '25px' }}>
                        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Ghi chú (Tùy chọn):</label>
                        <input 
                            type="text"
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' }}
                            value={formData.ghiChu} 
                            placeholder="Ví dụ: Giao giờ hành chính..."
                            onChange={e => setFormData({...formData, ghiChu: e.target.value})}
                        />
                    </div>

                    <h3 style={{ color: '#1e293b', borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>Phương thức thanh toán</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
                        <label style={{ cursor: 'pointer', padding: '15px', border: formData.phuongThucThanhToan === 'TIEN_MAT' ? '2px solid #6366f1' : '1px solid #e2e8f0', borderRadius: '8px', background: formData.phuongThucThanhToan === 'TIEN_MAT' ? '#eff6ff' : 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input type="radio" value="TIEN_MAT" checked={formData.phuongThucThanhToan === 'TIEN_MAT'} onChange={e => setFormData({...formData, phuongThucThanhToan: e.target.value})} /> 
                            💵 Thanh toán tiền mặt khi nhận hàng (COD)
                        </label>
                        <label style={{ cursor: 'pointer', padding: '15px', border: formData.phuongThucThanhToan === 'QR_CODE' ? '2px solid #6366f1' : '1px solid #e2e8f0', borderRadius: '8px', background: formData.phuongThucThanhToan === 'QR_CODE' ? '#eff6ff' : 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input type="radio" value="QR_CODE" checked={formData.phuongThucThanhToan === 'QR_CODE'} onChange={e => setFormData({...formData, phuongThucThanhToan: e.target.value})} /> 
                            📱 Chuyển khoản QR Code (Momo / VNPay / Bank)
                        </label>
                    </div>

                    {/* Hiển thị QR Code nếu chọn thanh toán chuyển khoản */}
                    {formData.phuongThucThanhToan === 'QR_CODE' && (
                        <div style={{ marginTop: '20px', textAlign: 'center', padding: '20px', background: '#f8fafc', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>
                            <p style={{ fontWeight: 'bold' }}>Quét mã QR dưới đây để thanh toán: <span style={{ color: '#ef4444', fontSize: '20px' }}>{new Intl.NumberFormat('vi-VN').format(tongTien)}đ</span></p>
                            {/* Bạn có thể thay link QR Code ngân hàng thật của bạn vào đây (Dùng VietQR) */}
                            <img src={`https://img.vietqr.io/image/970436-123456789-compact2.png?amount=${tongTien}&addInfo=ThanhToanKhStore&accountName=TRAN VAN THO KHANG`} alt="QR Code" style={{ width: '200px', borderRadius: '10px' }} />
                            <p style={{ color: '#64748b', fontSize: '13px', marginTop: '10px' }}>*Đơn hàng sẽ được tự động duyệt ngay sau khi hệ thống nhận được tiền.</p>
                        </div>
                    )}
                </form>
            </div>

            {/* CỘT PHẢI: TÓM TẮT ĐƠN HÀNG */}
            <div style={{ flex: '1', minWidth: '300px', background: '#f8fafc', padding: '30px', borderRadius: '12px', height: 'fit-content', border: '1px solid #e2e8f0' }}>
                <h3 style={{ marginTop: 0 }}>Tóm tắt đơn hàng</h3>
                <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '15px 0' }}/>
                
                {/* List sản phẩm mờ ảo */}
                <div style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '5px' }}>
                    {cart.map(item => (
                        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '14px', color: '#475569' }}>
                            <span style={{ flex: 1, paddingRight: '10px' }}><b>{item.soLuong}x</b> {item.sanPham.tenSanPham.length > 25 ? item.sanPham.tenSanPham.substring(0, 25) + '...' : item.sanPham.tenSanPham}</span>
                            <b style={{ color: '#1e293b' }}>{new Intl.NumberFormat('vi-VN').format(item.sanPham.giaBan * item.soLuong)}đ</b>
                        </div>
                    ))}
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '15px 0' }}/>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold' }}>
                    <span>Tổng thanh toán:</span>
                    <span style={{ color: '#ef4444' }}>{new Intl.NumberFormat('vi-VN').format(tongTien)}đ</span>
                </div>
                
                <button 
                    form="checkout-form" 
                    type="submit" 
                    style={{ width: '100%', padding: '16px', background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', marginTop: '25px', cursor: 'pointer', transition: '0.3s' }}
                    onMouseOver={(e) => e.target.style.background = '#059669'}
                    onMouseOut={(e) => e.target.style.background = '#10b981'}
                >
                    XÁC NHẬN ĐẶT HÀNG
                </button>
            </div>
        </div>
    );
}

export default Checkout;