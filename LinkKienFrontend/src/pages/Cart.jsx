import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import styles from './Cart.module.css';

function Cart() {
    const [gioHang, setGioHang] = useState([]);
    const navigate = useNavigate();

    // Lấy dữ liệu giỏ hàng
    const layGioHang = async () => {
        try {
            const response = await axiosClient.get('/gio-hang');
            setGioHang(response.data);
        } catch (error) {
            console.error('Lỗi khi tải giỏ hàng:', error);
            if (error.response?.status === 401 || error.response?.status === 403) {
                navigate('/login');
            }
        }
    };

    useEffect(() => {
        layGioHang();
    }, []);

    // Logic Xóa sản phẩm khỏi giỏ
    const xoaSanPham = async (cartItemId) => {
        if (!window.confirm("Bạn có chắc muốn bỏ sản phẩm này?")) return;
        
        try {
            await axiosClient.delete(`/gio-hang/xoa/${cartItemId}`);
            // Gọi lại hàm tải dữ liệu để cập nhật danh sách mới
            layGioHang(); 
        } catch (error) {
            alert('Có lỗi xảy ra khi xóa!');
        }
    };

    // Hàm format tiền tệ
    const formatTien = (tien) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tien);
    };

    // Tính tổng tiền tự động
    const tinhTongTien = () => {
        return gioHang.reduce((tong, item) => tong + (item.sanPham.giaBan * item.soLuong), 0);
    };

    return (
        <div className={styles.cartContainer}>
            <h2 className={styles.cartTitle}>Giỏ hàng của bạn ({gioHang.length} sản phẩm)</h2>

            {gioHang.length === 0 ? (
                <div className={styles.emptyCart}>
                    <p>Giỏ hàng đang trống.</p>
                    <Link to="/" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>
                        &larr; Tiếp tục mua sắm
                    </Link>
                </div>
            ) : (
                <>
                    <div className={styles.cartList}>
                        {gioHang.map((item) => (
                            <div className={styles.cartItem} key={item.id}>
                                <img 
                                    className={styles.itemImage} 
                                    src={item.sanPham.hinhAnh || "https://img.freepik.com/free-vector/computer-processor-cpu-icon_1017-38686.jpg"} 
                                    alt="Linh kiện" 
                                />
                                <div className={styles.itemInfo}>
                                    <h4 className={styles.itemName}>{item.sanPham.tenSanPham}</h4>
                                    <p className={styles.itemCategory}>{item.sanPham.danhMuc?.tenDanhMuc}</p>
                                </div>
                                <div className={styles.itemPrice}>
                                    {formatTien(item.sanPham.giaBan)}
                                </div>
                                <div className={styles.itemQty}>
                                    x {item.soLuong}
                                </div>
                                <button className={styles.btnDelete} onClick={() => xoaSanPham(item.id)}>
                                    Xóa
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className={styles.cartSummary}>
                        <div className={styles.totalText}>Tổng cộng:</div>
                        <div className={styles.totalAmount}>{formatTien(tinhTongTien())}</div>
                        {/* Nút thanh toán tạm thời báo Alert, sẽ nối vào API Checkout sau */}
                        <button className={styles.btnCheckout} onClick={() => alert('Sẵn sàng chốt đơn!')}>
                            Thanh Toán Ngay
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Cart;