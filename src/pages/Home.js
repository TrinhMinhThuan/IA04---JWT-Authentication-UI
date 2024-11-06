import React from 'react';
import '../index.css';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <Layout>
            <h2 className="text-4xl font-bold mb-10 mt-5">Trang Chủ</h2>
            <Link
                    to="/profile"
                    className="m-2 py-2 px-4 w-48 h-11 text-xl bg-white font-semibold rounded-md hover:bg-gray-200 transition duration-200 text-center inline-block"
                >
                    Profile
            </Link>
        </Layout>
        
    );
}

export default Home;
