import React, { useState } from 'react';
import Loading from '../components/Loading';
import Layout from '../components/Layout';
import { setAuthToken } from '../utils/auth'; // Import hàm lưu token

function Login() {
    const [key, setKey] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const loginData = { key, password };

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData),
            });

            const result = await response.json();
            setLoading(false);

            if (!response.ok) {
                setError(result.message);
                setSuccess(null);
            } else {
                setSuccess(result.message);
                setError(null);
                setAuthToken(result);
                localStorage.setItem('username', result.username);
            }
        } catch (error) {
            setLoading(false);
            setError("Lỗi mạng. Không thể kết nối tới server.");
            setSuccess(null);
        }
    };

    return (
        <Layout>
            <h2 className="text-4xl font-bold mb-6 mt-5">Đăng Nhập</h2>
            <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-md space-y-4 text-center font-bold">
                <label className="block">
                    <span className="text-gray-700">Tên người dùng hoặc email:</span>
                    <input 
                        type="text" 
                        value={key} 
                        onChange={(e) => setKey(e.target.value)} 
                        required 
                        className="font-normal mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Mật khẩu:</span>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        className="font-normal mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </label>
                {error && <p className="text-red-600 font-bold mt-3">{error}</p>} {/* Hiển thị thông báo lỗi */}
                {success && <p className="text-green-600 font-bold mt-3">{success}</p>} {/* Hiển thị thông báo thành công */}
                
                <button 
                    type="submit" 
                    className="w-1/2 mt-5 py-2 px-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition duration-200"
                    disabled={loading} // Disable button khi đang loading
                >
                    Đăng Nhập
                </button>
            </form>
            {loading && <Loading />} {/* Hiển thị Loading khi đang gửi yêu cầu */}
        </Layout>
    );
}

export default Login;
