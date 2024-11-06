// Lưu token vào localStorage
export const setAuthToken = (token) => {
    localStorage.setItem('authToken', token.access_token);
  };
  
  // Lấy token từ localStorage
  export const getAuthToken = () => {
    return localStorage.getItem('authToken');
  };
  
  // Xóa token khỏi localStorage khi đăng xuất
  export const clearAuthToken = () => {
    localStorage.removeItem('authToken'); 
  };
  
  // Tạo header có chứa token để dùng trong các API cần xác thực
  export const getAuthHeader = () => {
    const token = getAuthToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  };
  