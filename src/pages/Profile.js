import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthHeader } from '../utils/auth'; // Import hàm getAuthHeader
import Loading from '../components/Loading';
import Layout from '../components/Layout';

function Profile() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/profile`, {
          method: 'GET',
          headers: {
            ...getAuthHeader(), // Sử dụng token trong header
            'Content-Type': 'application/json',
          },
        });
        console.log(response)

        if (!response.ok) {
          throw new Error('Không thể lấy thông tin người dùng');
        }

        const result = await response.json();
        setUserInfo(result);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-600 font-bold">{error}</div>;
  }

  return (
    <Layout>
      <h2 className="text-4xl font-bold mb-6 mt-5">Profile</h2>
      {userInfo && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-md space-y-4">
          <p><strong>Tên người dùng: </strong>{userInfo.username}</p>
          <p><strong>Email: </strong>{userInfo.email}</p>
          <p><strong>Tài khoản tạo vào lúc: </strong>{new Date(userInfo.createdAt).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}</p>

        </div>
      )}
    </Layout>
  );
}

export default Profile;
