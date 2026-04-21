import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosClient from '../api/axiosClient';

function Cart() {
    const [gioHang, setGioHang] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const layGioHang = async () => {
        try {
            const res = await axiosClient.get('/gio-hang');
            setGioHang(res.data);
        } catch (error) { 
            console.error("Lỗi tải giỏ hàng:", error); 
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { layGioHang(); }, []);

    // HÀM TĂNG GIẢM SỐ LƯỢNG
    const capNhatSoLuong = async (id, soLuongMoi, soLuongTonKho) => {
        if (soLuongMoi < 1) return; // Không cho giảm xuống dưới 1
        if (soLuongMoi > soLuongTonKho) {
            alert("Rất tiếc, vượt quá số lượng trong kho!"); 
            return;
        }
        try {
            await axiosClient.put(`/gio-hang/cap-nhat/${id}?soLuong=${soLuongMoi}`);
            layGioHang(); // Gọi lại API để cập nhật tổng tiền
            window.dispatchEvent(new Event('cartUpdated')); // Cập nhật số trên Header
        } catch (error) { 
            alert('Lỗi cập nhật số lượng'); 
        }
    };

    const xoaSanPham = async (id) => {
        if (window.confirm("Bỏ sản phẩm này khỏi giỏ?")) {
            await axiosClient.delete(`/gio-hang/xoa/${id}`);
            layGioHang();
            window.dispatchEvent(new Event('cartUpdated')); 
        }
    };

    const tinhTongTien = () => gioHang.reduce((t, item) => t + (item.sanPham.giaBan * item.soLuong), 0);
    const formatTien = (tien) => new Intl.NumberFormat('vi-VN').format(tien) + ' ₫';

    if (loading) return <div style={{textAlign: 'center', marginTop: '50px'}}>Đang tải giỏ hàng...</div>;

    return (
        <div style={{ maxWidth: '900px', margin: '40px auto', padding: '20px' }}>
            <h2 style={{ color: '#1e293b', marginBottom: '20px' }}>Giỏ hàng của bạn ({gioHang.length} sản phẩm)</h2>
            
            {gioHang.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '50px', background: 'white', borderRadius: '12px' }}>
                    <p style={{ fontSize: '18px', color: '#64748b' }}>Giỏ hàng đang trống.</p>
                    <Link to="/" style={{ display: 'inline-block', marginTop: '15px', padding: '10px 20px', background: '#6366f1', color: 'white', textDecoration: 'none', borderRadius: '8px' }}>Mua sắm ngay</Link>
                </div>
            ) : (
                <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
                    {/* DANH SÁCH SẢN PHẨM */}
                    <div style={{ flex: '2', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {gioHang.map(item => (
                            <div key={item.id} style={{ display: 'flex', alignItems: 'center', background: 'white', padding: '15px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                                <img src={item.sanPham.hinhAnh || "https://via.placeholder.com/100"} alt="sp" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
                                
                                <div style={{ flex: 1, marginLeft: '15px' }}>
                                    <h4 style={{ margin: '0 0 5px 0', color: '#1e293b' }}>{item.sanPham.tenSanPham}</h4>
                                    <div style={{ color: '#ef4444', fontWeight: 'bold' }}>{formatTien(item.sanPham.giaBan)}</div>
                                </div>
                                
                                {/* Nút tăng giảm */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f1f5f9', padding: '5px 10px', borderRadius: '8px' }}>
                                    <button onClick={() => capNhatSoLuong(item.id, item.soLuong - 1, item.sanPham.soLuongTon)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '18px', padding: '0 5px' }}>-</button>
                                    <b style={{ width: '20px', textAlign: 'center' }}>{item.soLuong}</b>
                                    <button onClick={() => capNhatSoLuong(item.id, item.soLuong + 1, item.sanPham.soLuongTon)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '18px', padding: '0 5px' }}>+</button>
                                </div>

                                <button onClick={() => xoaSanPham(item.id)} style={{ marginLeft: '20px', color: '#ef4444', border: 'none', background: '#fee2e2', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer' }}>Xóa</button>
                            </div>
                        ))}
                    </div>

                    {/* TỔNG TIỀN & THANH TOÁN */}
                    <div style={{ flex: '1', minWidth: '250px', background: 'white', padding: '20px', borderRadius: '12px', height: 'fit-content', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ marginTop: 0 }}>Tổng cộng</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', margin: '20px 0' }}>
                            <span>Tạm tính:</span>
                            <b style={{ color: '#6366f1' }}>{formatTien(tinhTongTien())}</b>
                        </div>
                        <button onClick={() => navigate('/checkout')} style={{ width: '100%', padding: '15px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
                            TIẾN HÀNH THANH TOÁN
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;