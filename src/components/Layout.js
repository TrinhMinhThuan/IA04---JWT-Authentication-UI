import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="component flex flex-col items-center p-4 min-h-screen bg-gradient-to-r from-gray-300 to-gray-400">
        {children}
      </main>
    </div>
  );
};

export default Layout;
