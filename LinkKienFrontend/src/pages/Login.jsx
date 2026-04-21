import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosClient from '../api/axiosClient';

function Login() {
    // State lưu trữ dữ liệu người dùng gõ vào
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            // Gửi dữ liệu lên Backend (Lưu ý: Khớp tên biến tenDangNhap, matKhau với DTO)
            const response = await axiosClient.post('/auth/login', { 
                tenDangNhap: username, 
                matKhau: password 
            });
            
            // Lấy gói dữ liệu JSON từ Backend trả về
            const data = response.data; 

            // Cất vào Két sắt (localStorage) để dùng cho toàn bộ hệ thống
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);
            localStorage.setItem('role', data.role); // Cất luôn quyền (vai_tro)

            // Bắn sự kiện để Header (hoặc các component khác) biết là đã login
            window.dispatchEvent(new Event('authChanged'));

            alert('Đăng nhập thành công!');

            // PHÂN LUỒNG CHUYỂN TRANG DỰA VÀO VAI TRÒ
            if (data.role === 'ADMIN') {
                navigate('/admin'); // Admin thì cho bay thẳng vào Dashboard
            } else {
                navigate('/');      // Khách bình thường thì ra Trang chủ mua đồ
            }

        } catch (error) {
            console.error("Lỗi đăng nhập:", error);
            // Lấy câu thông báo lỗi từ Backend (nếu có), không thì báo lỗi chung
            const errorMsg = error.response?.data?.message || "Sai tên đăng nhập hoặc mật khẩu!";
            alert(errorMsg);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '100px auto', padding: '30px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: '10px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#4A7766' }}>Đăng nhập KhStore</h2>
            
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Tên đăng nhập:</label>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                </div>
                
                <div>
                    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Mật khẩu:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                </div>
                
                <button 
                    type="submit" 
                    style={{ padding: '12px', background: '#4A7766', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}
                >
                    Đăng Nhập
                </button>
            </form>

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <p>Chưa có tài khoản? <Link to="/register" style={{ color: '#007bff' }}>Đăng ký ngay</Link></p>
            </div>
        </div>
    );
}

export default Login;