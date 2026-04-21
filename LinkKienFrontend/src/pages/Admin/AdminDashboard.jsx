import styles from './Admin.module.css';

function AdminDashboard() {
  const chartData = [
    { val: 40, label: 'T2' },
    { val: 70, label: 'T3' },
    { val: 45, label: 'T4' },
    { val: 90, label: 'T5' },
    { val: 65, label: 'T6' },
    { val: 85, label: 'T7' },
    { val: 100, label: 'CN' },
  ];

  const maxVal = Math.max(...chartData.map(d => d.val));

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <h2 className={styles.pageTitle}>
          Tổng quan <span className={styles.pageTitleAccent}>Hệ thống</span>
        </h2>
        <span style={{ fontSize: 13, color: 'rgba(226,232,240,0.4)', letterSpacing: '0.5px' }}>
          Cập nhật: {new Date().toLocaleDateString('vi-VN')}
        </span>
      </div>

      {/* Stat Cards */}
      <div className={styles.cardStats}>
        <div className={styles.statItem}>
          <p>Doanh thu tháng</p>
          <div className={styles.statValue}>150.000.000 ₫</div>
          <span className={styles.statIcon}>💰</span>
        </div>
        <div className={styles.statItem}>
          <p>Đơn hàng mới</p>
          <div className={styles.statValue}>42</div>
          <span className={styles.statIcon}>📦</span>
        </div>
        <div className={styles.statItem}>
          <p>Sản phẩm sắp hết</p>
          <div className={`${styles.statValue} ${styles.statDanger}`}>5</div>
          <span className={styles.statIcon}>⚠️</span>
        </div>
        <div className={styles.statItem}>
          <p>Yêu cầu đổi trả</p>
          <div className={styles.statValue}>3</div>
          <span className={styles.statIcon}>🔄</span>
        </div>
      </div>

      {/* Chart */}
      <div className={styles.chartContainer}>
        <h3 className={styles.chartTitle}>Doanh thu 7 ngày gần nhất</h3>
        <div className={styles.chartPlaceholder}>
          {chartData.map((item, index) => (
            <div key={index}>
              <div
                className={styles.bar}
                style={{ height: `${(item.val / maxVal) * 160}px` }}
              />
              <span className={styles.chartLabel}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;