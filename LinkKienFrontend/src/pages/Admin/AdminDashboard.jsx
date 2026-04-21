import styles from './Admin.module.css';

function AdminDashboard() {
  // Dữ liệu mô phỏng cho biểu đồ
  const chartData = [40, 70, 45, 90, 65, 85, 100];

  return (
    <div>
      <h2 style={{marginBottom: '20px'}}>Tổng quan hệ thống</h2>
      
      {/* Các thẻ con số */}
      <div className={styles.cardStats}>
        <div className={styles.statItem}>
          <p>Doanh thu tháng</p>
          <div className={styles.statValue}>150.000.000 đ</div>
        </div>
        <div className={styles.statItem}>
          <p>Đơn hàng mới</p>
          <div className={styles.statValue}>42</div>
        </div>
        <div className={styles.statItem}>
          <p>Sản phẩm sắp hết</p>
          <div className={styles.statValue} style={{color: 'red'}}>5</div>
        </div>
        <div className={styles.statItem}>
          <p>Yêu cầu đổi trả</p>
          <div className={styles.statValue}>3</div>
        </div>
      </div>

      {/* Biểu đồ mô phỏng bằng CSS */}
      <h3 style={{marginBottom: '15px'}}>Thống kê doanh thu 7 ngày gần nhất</h3>
      <div className={styles.chartPlaceholder}>
        {chartData.map((val, index) => (
          <div key={index} style={{textAlign: 'center'}}>
            <div className={styles.bar} style={{height: `${val * 2}px`}}></div>
            <small>T{index + 2}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;