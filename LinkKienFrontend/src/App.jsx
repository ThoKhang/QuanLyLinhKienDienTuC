// CÁC DÒNG IMPORT NÀY RẤT QUAN TRỌNG, KHÔNG ĐƯỢC THIẾU
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import các trang của Khách hàng
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Register from './pages/Register'; // ĐÃ SỬA: Đổi tên import từ Cart thành Register
import Profile from './pages/Profile'; 
import MyOrders from './pages/MyOrders';
import MyReturns from './pages/MyReturns';
// Import các trang của Admin
import AdminLayout from './pages/Admin/AdminLayout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminProduct from './pages/Admin/AdminProduct'; 
import AdminAccount from './pages/Admin/AdminAccount';
import AdminComment from './pages/Admin/AdminComment';
import AdminReturn from './pages/Admin/AdminReturn';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ROUTE CHO KHÁCH HÀNG */}
        <Route path="/" element={<><Header /><Home /></>} />
        <Route path="/product/:id" element={<><Header /><ProductDetail /></>} />
        <Route path="/login" element={<Login />} />
        
        {/* ĐÃ BỔ SUNG: Route dành riêng cho trang Đăng ký */}
        <Route path="/register" element={<Register />} /> 

        <Route path="/cart" element={<><Header /><Cart /></>} />
        <Route path="/profile" element={<><Header /><Profile /></>} />
        <Route path="/my-orders" element={<><Header /><MyOrders /></>} />
        <Route path="/my-returns" element={<><Header /><MyReturns /></>} />

        {/* ROUTE CHO ADMIN */}
        <Route path="/admin" element={<AdminLayout />}>
           <Route index element={<AdminDashboard />} />
           <Route path="products" element={<AdminProduct />} />
           <Route path="accounts" element={<AdminAccount />} />
           <Route path="comments" element={<AdminComment />} />
           <Route path="returns" element={<AdminReturn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;