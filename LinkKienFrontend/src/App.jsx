// CÁC DÒNG IMPORT NÀY RẤT QUAN TRỌNG, KHÔNG ĐƯỢC THIẾU
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import các trang của Khách hàng
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail';

// Import các trang của Admin
import AdminLayout from './pages/Admin/AdminLayout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminProduct from './pages/Admin/AdminProduct'; // Khang đã import đúng ở đây

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ROUTE CHO KHÁCH HÀNG */}
        <Route path="/" element={<><Header /><Home /></>} />
        <Route path="/product/:id" element={<><Header /><ProductDetail /></>} />
        <Route path="/login" element={<Login />} />
        
        {/* ROUTE CHO ADMIN */}
        <Route path="/admin" element={<AdminLayout />}>
           <Route index element={<AdminDashboard />} />
           
           {/* ĐÃ SỬA DÒNG NÀY: Dùng <AdminProduct /> thay vì <div> */}
           <Route path="products" element={<AdminProduct />} />
           
           <Route path="accounts" element={<div>Trang Quản lý Tài khoản</div>} />
           <Route path="comments" element={<div>Trang Quản lý Bình luận</div>} />
           <Route path="returns" element={<div>Trang Yêu cầu Đổi trả</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// DÒNG NÀY ĐỂ FIX LỖI "does not provide an export named 'default'"
export default App;