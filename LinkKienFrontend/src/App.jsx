// CÁC DÒNG IMPORT NÀY RẤT QUAN TRỌNG, KHÔNG ĐƯỢC THIẾU
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import các trang của Khách hàng
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
// Import các trang của Admin
import AdminLayout from './pages/Admin/AdminLayout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminProduct from './pages/Admin/AdminProduct'; // Khang đã import đúng ở đây
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
        <Route path="/cart" element={<><Header /><Cart /></>} />
        {/* ROUTE CHO ADMIN */}
        <Route path="/admin" element={<AdminLayout />}>
           <Route index element={<AdminDashboard />} />
           <Route path="products" element={<AdminProduct />} />
           
           {/* ĐÃ SỬA: Thay thế div bằng các Component Khang đã import */}
           <Route path="accounts" element={<AdminAccount />} />
           <Route path="comments" element={<AdminComment />} />
           <Route path="returns" element={<AdminReturn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// DÒNG NÀY ĐỂ FIX LỖI "does not provide an export named 'default'"
export default App;