import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { clearAuthToken } from '../utils/auth';

function Header() {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Trạng thái của hamburger menu

    const handleLogout = async () => {
        clearAuthToken();
        localStorage.removeItem('username');
        navigate('/login');
    };

    return (
        <header className="flex justify-between items-center p-4 bg-white">
            {/* Hiển thị tên người dùng ở phía bên trái */}
            <div className="flex items-center">
                {username && <span className="font-bold pl-4 mr-auto">{username}</span>}
            </div>


            <div className="md:hidden flex items-center">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="text-gray-600 focus:outline-none ml-36"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            </div>

            {/* Nav links - responsive */}
            <nav
                className={`md:flex flex-col md:flex-row items-center space-x-4 mr-10 ml-auto font-bold transition-all duration-300 ${
                    isMobileMenuOpen ? 'flex' : 'hidden'
                } md:flex md:space-x-4`}
            >
                <Link
                    to="/"
                    className=" ml-5 m-2 py-2 px-4 w-32 bg-gray-600 text-white font-bold rounded-md hover:bg-gray-700 transition duration-200 text-center inline-block"
                >
                    Trang chủ
                </Link>
                <Link
                    to="/register"
                    className="m-2 py-2 px-4 w-32 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 transition duration-200 text-center inline-block"
                >
                    Đăng ký
                </Link>
                <Link
                    to="/login"
                    className="m-2 py-2 px-4 w-32 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition duration-200 text-center inline-block"
                >
                    Đăng nhập
                </Link>
                {username && (
                    <button
                        onClick={handleLogout}
                        className="m-2 py-2 px-4 w-32 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 transition duration-200 text-center inline-block"
                    >
                        Đăng xuất
                    </button>
                )}
            </nav>
        </header>
    );
}

export default Header;
