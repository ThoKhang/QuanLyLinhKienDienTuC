import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import styles from './ProductDetail.module.css';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Lấy thông tin chi tiết sản phẩm
                const resProduct = await axiosClient.get(`/public/san-pham/${id}`);
                setProduct(resProduct.data);
                
                // 2. Lấy danh sách bình luận (Đúng đường dẫn Backend của bạn)
                const resReviews = await axiosClient.get(`/public/danh-gia/${id}`); 
                setReviews(resReviews.data);
                
                console.log("Dữ liệu bình luận:", resReviews.data); 
            } catch (err) {
                console.error("Lỗi tải dữ liệu:", err);
            }
        };
        fetchData();
    }, [id]);

    const formatTien = (tien) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tien);

    const renderStars = (rating) => {
        return "⭐".repeat(rating) + "☆".repeat(5 - rating);
    };

    const handleAddToCart = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Vui lòng đăng nhập để mua hàng!');
            navigate('/login');
            return;
        }
        try {
            await axiosClient.post(`/gio-hang/them?sanPhamId=${id}&soLuong=1`);
            window.dispatchEvent(new Event('cartUpdated')); 
            alert('Đã thêm sản phẩm vào giỏ hàng!');
        } catch (error) {
            alert('Lỗi khi thêm vào giỏ hàng');
        }
    };

    if (!product) return <div className={styles.loading}>Đang tải linh kiện KhStore...</div>;

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.container}>
                <div className={styles.imageSection}>
                    <img className={styles.productImg} src={product.hinhAnh} alt={product.tenSanPham} />
                </div>
                <div className={styles.infoSection}>
                    <p className={styles.category}>{product.danhMuc?.tenDanhMuc}</p>
                    <h1 className={styles.title}>{product.tenSanPham}</h1>
                    <div className={styles.price}>{formatTien(product.giaBan)}</div>
                    <p className={styles.description}>{product.moTa}</p>
                    <div className={styles.actionButtons}>
                        <button className={styles.btnCart} onClick={handleAddToCart}>
                            🛒 Thêm vào giỏ hàng
                        </button>
                        <button className={styles.btnBack} onClick={() => navigate('/')}>Quay lại</button>
                    </div>
                </div>
            </div>

            <div className={styles.reviewSection}>
                <h2 className={styles.reviewTitle}>Khách hàng nói gì về sản phẩm này?</h2>
                
                {reviews.length === 0 ? (
                    <p className={styles.noReview}>Chưa có đánh giá nào. Hãy là người đầu tiên mua và đánh giá!</p>
                ) : (
                    reviews.map((rv) => (
                        <div key={rv.id} className={styles.reviewItem}>
                            <div className={styles.reviewHeader}>
                                <div className={styles.userInfo}>
                                    <span className={styles.userName}>{rv.nguoiDung?.hoTen || "Khách hàng ẩn danh"}</span>
                                    <span className={styles.verified}>✔️ Đã mua hàng</span>
                                </div>
                                <span className={styles.starRating}>{renderStars(rv.soSao)}</span>
                            </div>
                            
                            <p className={styles.reviewContent}>{rv.noiDung}</p>

                            {/* HIỂN THỊ HÌNH ẢNH THỰC TẾ (Nếu Backend trả về hinhAnhs) */}
                            {rv.hinhAnhs && rv.hinhAnhs.length > 0 && (
                                <div className={styles.reviewImages}>
                                    {rv.hinhAnhs.map((img, index) => (
                                        <img 
                                            key={index} 
                                            src={img.urlHinhAnh} 
                                            alt="Review thực tế" 
                                            className={styles.reviewImg} 
                                            onClick={() => window.open(img.urlHinhAnh, '_blank')}
                                        />
                                    ))}
                                </div>
                            )}

                            <div className={styles.reviewFooter}>
                                <span>Đăng ngày: {new Date(rv.ngayTao).toLocaleDateString('vi-VN')}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default ProductDetail;