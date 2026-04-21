import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Thêm useLocation
import axiosClient from '../api/axiosClient';
import styles from './Home.module.css';

function Home() {
    const [sanPhams, setSanPhams] = useState([]);
    const navigate = useNavigate();
    const location = useLocation(); // Dùng để lấy tham số ?search=... trên URL

    useEffect(() => {
        const layDuLieu = async () => {
            try {
                // Lấy từ khóa search từ URL
                const searchParams = new URLSearchParams(location.search);
                const query = searchParams.get('search');

                let response;
                if (query) {
                    // Nếu có tìm kiếm: Gọi API search mà Khang đã làm ở Backend
                    response = await axiosClient.get(`/public/san-pham/search?ten=${query}`);
                } else {
                    // Nếu không: Lấy tất cả như cũ
                    response = await axiosClient.get('/public/san-pham');
                }
                setSanPhams(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy sản phẩm:', error);
            }
        };
        layDuLieu();
    }, [location.search]); // Chạy lại mỗi khi URL thay đổi (người dùng tìm kiếm từ khóa mới)

    const formatTien = (tien) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tien);
    };

    const themVaoGio = async (sanPhamId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Vui lòng đăng nhập để mua hàng!');
            navigate('/login');
            return;
        }
        try {
            await axiosClient.post(`/gio-hang/them?sanPhamId=${sanPhamId}&soLuong=1`);
            window.dispatchEvent(new Event('cartUpdated')); 
            alert('Đã thêm vào giỏ hàng thành công!');
        } catch (error) {
            alert('Không thể thêm vào giỏ hàng. Vui lòng thử lại!');
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.headerTitle}>Khang PC & Gaming Gear</h1>
            <p className={styles.subTitle}>Nâng tầm sức mạnh cỗ máy của bạn</p>

            <div className={styles.productGrid}>
                {sanPhams.length === 0 ? (
                    <p style={{ gridColumn: '1/-1', textAlign: 'center', marginTop: '20px', color: '#666' }}>
                        Không tìm thấy linh kiện phù hợp với yêu cầu của bạn.
                    </p>
                ) : (
                    sanPhams.map((sp) => (
                        <div className={styles.productItem} key={sp.id}>
                            <img 
                                className={styles.productImg} 
                                src={sp.hinhAnh || "https://placehold.co/100x100?text=KhStore"} 
                                alt={sp.tenSanPham} 
                                onClick={() => navigate(`/product/${sp.id}`)} 
                            />
                            <h3 className={styles.productName}>{sp.tenSanPham}</h3>
                            <p className={styles.productDesc}>{sp.moTa}</p>
                            
                            <div className={styles.priceRow}>
                                <span className={styles.productPrice}>{formatTien(sp.giaBan)}</span>
                                <button className={styles.btnCart} onClick={() => themVaoGio(sp.id)}>
                                    Thêm vào giỏ
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Home;