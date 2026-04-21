import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Thêm import này
import axiosClient from '../api/axiosClient';
import styles from './Home.module.css';

function Home() {
    const [sanPhams, setSanPhams] = useState([]);
    const navigate = useNavigate(); // Dùng để chuyển hướng

    useEffect(() => {
        const layDuLieu = async () => {
            try {
                const response = await axiosClient.get('/public/san-pham');
                setSanPhams(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy sản phẩm:', error);
            }
        };
        layDuLieu();
    }, []);

    const formatTien = (tien) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tien);
    };

    // LOGIC THÊM VÀO GIỎ HÀNG
    const themVaoGio = async (sanPhamId) => {
        // Kiểm tra xem có vé (Token) chưa
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Vui lòng đăng nhập để mua hàng!');
            navigate('/login');
            return;
        }

        try {
            // Gọi API Backend: Truyền id sản phẩm và mặc định số lượng = 1
            await axiosClient.post(`/gio-hang/them?sanPhamId=${sanPhamId}&soLuong=1`);
            alert('Đã thêm sản phẩm vào giỏ hàng thành công!');
        } catch (error) {
            alert(error.response?.data || 'Lỗi khi thêm vào giỏ hàng');
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.headerTitle}>Khang PC & Gaming Gear</h1>
            <p className={styles.subTitle}>Nâng tầm sức mạnh cỗ máy của bạn</p>

            <div className={styles.productGrid}>
                {sanPhams.map((sp) => (
                    <div className={styles.productItem} key={sp.id}>
                        <img 
                            className={styles.productImg} 
                            src={sp.hinhAnh || "https://img.freepik.com/free-vector/computer-processor-cpu-icon_1017-38686.jpg"} 
                            alt={sp.tenSanPham} 
                        />
                        <h3 className={styles.productName}>{sp.tenSanPham}</h3>
                        <p className={styles.productDesc}>{sp.moTa}</p>
                        
                        <div className={styles.priceRow}>
                            <span className={styles.productPrice}>{formatTien(sp.giaBan)}</span>
                            {/* Gắn sự kiện onClick vào nút */}
                            <button className={styles.btnCart} onClick={() => themVaoGio(sp.id)}>
                                Thêm vào giỏ
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;