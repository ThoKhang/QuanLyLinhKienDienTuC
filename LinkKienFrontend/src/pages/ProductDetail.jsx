import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import styles from './ProductDetail.module.css';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]); // State giữ danh sách bình luận
    const navigate = useNavigate();

    // src/pages/ProductDetail.jsx

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Lấy thông tin sản phẩm
                const resProduct = await axiosClient.get(`/public/san-pham/${id}`);
                setProduct(resProduct.data);
                
                // 2. SỬA DÒNG NÀY: Gọi đúng địa chỉ trong DanhGiaController của bạn
                // Bỏ "/san-pham" ở giữa đi, chỉ để "/public/danh-gia/" thôi
                const resReviews = await axiosClient.get(`/public/danh-gia/${id}`); 
                setReviews(resReviews.data);
                
                console.log("Dữ liệu bình luận:", resReviews.data); // Để debug xem dữ liệu về chưa
            } catch (err) {
                console.error("Lỗi tải dữ liệu sản phẩm hoặc bình luận", err);
            }
        };
        fetchData();
    }, [id]);

    const formatTien = (tien) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tien);

    // Hàm vẽ sao dựa trên số sao (so_sao)
    const renderStars = (rating) => {
        return "⭐".repeat(rating) + "☆".repeat(5 - rating);
    };

    if (!product) return <div className={styles.loading}>Đang tải linh kiện...</div>;

    return (
        <div className={styles.pageWrapper}>
            {/* PHẦN 1: THÔNG TIN CHI TIẾT SẢN PHẨM */}
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
                        <button className={styles.btnCart}>🛒 Thêm vào giỏ hàng</button>
                        <button className={styles.btnBack} onClick={() => navigate('/')}>Quay lại</button>
                    </div>
                </div>
            </div>

            {/* PHẦN 2: ĐÁNH GIÁ VÀ BÌNH LUẬN (Dựa trên bảng SQL của bạn) */}
            <div className={styles.reviewSection}>
                <h2 className={styles.reviewTitle}>Khách hàng nói gì về sản phẩm này?</h2>
                
                {reviews.length === 0 ? (
                    <p className={styles.noReview}>Chưa có đánh giá nào. Hãy là người đầu tiên mua và đánh giá!</p>
                ) : (
                    reviews.map((rv) => (
                        <div key={rv.id} className={styles.reviewItem}>
                            <div className={styles.reviewHeader}>
                                <div className={styles.userInfo}>
                                    <span className={styles.userName}>{rv.nguoiDung?.hoTen || "Khách hàng"}</span>
                                    <span className={styles.verified}>✔️ Đã mua hàng</span>
                                </div>
                                <span className={styles.starRating}>{renderStars(rv.soSao)}</span>
                            </div>
                            
                            <p className={styles.reviewContent}>{rv.noiDung}</p>

                            {/* HIỂN THỊ HÌNH ẢNH ĐÍNH KÈM (Bảng hinh_anh_danh_gia) */}
                            {rv.hinhAnhs && rv.hinhAnhs.length > 0 && (
                                <div className={styles.reviewImages}>
                                    {rv.hinhAnhs.map((img, index) => (
                                        <img key={index} src={img.urlHinhAnh} alt="Review thực tế" className={styles.reviewImg} />
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