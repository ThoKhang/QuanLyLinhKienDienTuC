import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8080/api', // Trỏ thẳng vào Backend Spring Boot của bạn
    headers: {
        'Content-Type': 'application/json',
    },
});

// TỰ ĐỘNG GẮN TOKEN: Lấy thẻ Token từ két sắt trình duyệt để nhét vào Header mỗi khi gửi Request
axiosClient.interceptors.request.use(
    (config) => {
        let token = localStorage.getItem('token');
        if (token) {
            // Nếu token chưa có chữ Bearer thì mới thêm vào, tránh bị lặp
            if (!token.startsWith('Bearer ')) {
                token = `Bearer ${token}`;
            }
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosClient;