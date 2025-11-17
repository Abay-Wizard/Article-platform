import React from 'react';
import leftArticle from '../assets/leftArticle.jpg';
import { useNavigate } from 'react-router-dom';
import { Home, User, Bookmark, Plus } from 'lucide-react';

const LeftSide = () => {
  const navigate = useNavigate();

  const navItems = [
    { label: 'Home', icon: <Home size={18} />, path: '/' },
    { label: 'Profile', icon: <User size={18} />, path: '/profile' },
    { label: 'Your Articles', icon: <Bookmark size={18} />, path: '/user-articles' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-60 lg:w-64 sticky top-14 h-[calc(100vh-64px)] p-4 bg-white dark:bg-gray-800 shadow-lg rounded-xl space-y-6 transition-colors duration-300">
      <div className="overflow-hidden rounded-lg shadow-sm">
        <img
          src={leftArticle}
          alt="Left Article"
          className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className="flex items-center cursor-pointer gap-2 p-2 text-gray-700 dark:text-gray-200 font-medium rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-700 dark:hover:text-white transition-colors duration-300"
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto">
        <button
          onClick={() => navigate('/post')}
          className="w-full py-2 cursor-pointer bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors duration-300"
        >
          <Plus size={16} />
          Create Post
        </button>
      </div>
    </aside>
  );
};

export default LeftSide;
