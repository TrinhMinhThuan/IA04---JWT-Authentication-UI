// Loading.js
import React from 'react';

const Loading = () => (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
    <div className="animate-spin rounded-full border-4 border-t-4 border-gray-300 w-16 h-16"></div>
  </div>
);

export default Loading;
