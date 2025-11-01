import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { userStore } from "../store/userStore";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, Logout, checkUser } = userStore();
  const navigate = useNavigate();
  const profileRef = useRef();

  useEffect(() => {
    checkUser();

    // Close profile dropdown if clicking outside
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg z-50">
      <div className="flex items-center justify-between px-5 md:px-10 py-3">
        {/* Logo */}
        <h1
          className="text-2xl md:text-3xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Article<span className="text-purple-200">Hub</span>
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-lg font-medium">
          <li className="hover:text-purple-200 transition">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-purple-200 transition">
            <Link to="/about">About</Link>
          </li>
          <li className="hover:text-purple-200 transition">
            <Link to="/connect">Connect</Link>
          </li>
        </ul>

        {/* User / Profile */}
        <div className="hidden md:flex items-center gap-4 relative">
          {user ? (
            <div ref={profileRef} className="relative">
              <img
                onClick={() => setIsProfileOpen(prev => !prev)}
                src={
                  user.profilePic ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="User"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover cursor-pointer border-2 border-white hover:scale-105 transition"
              />

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-purple-50 text-gray-800 rounded-lg shadow-lg overflow-hidden z-50">
                  <ul className="flex flex-col">
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 hover:bg-purple-100 transition"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/user-articles"
                        className="block px-4 py-2 hover:bg-purple-100 transition"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Your Articles
                      </Link>
                    </li>
                    <li
                      className="block px-4 py-2 cursor-pointer hover:bg-purple-100 transition"
                      onClick={() => {
                        Logout();
                        setIsProfileOpen(false);
                      }}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/signup")}
              className="bg-white text-purple-700 font-semibold px-4 py-2 rounded-lg hover:bg-purple-200 transition"
            >
              Sign Up
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          {isMenuOpen ? (
            <X size={30} onClick={() => setIsMenuOpen(prev => !prev)} />
          ) : (
            <Menu size={30} onClick={() => setIsMenuOpen(prev => !prev)} />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-purple-700 bg-opacity-95 py-4 px-6 space-y-4 text-center text-lg font-medium">
          <Link
            to="/"
            onClick={() => setIsMenuOpen(prev => !prev)}
            className="block hover:text-purple-200"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setIsMenuOpen(prev => !prev)}
            className="block hover:text-purple-200"
          >
            About
          </Link>
          <Link
            to="/connect"
            onClick={() => setIsMenuOpen(prev => !prev)}
            className="block hover:text-purple-200"
          >
            Connect
          </Link>
          <hr className="border-purple-400" />
          {user ? (
            <div className="flex flex-col items-center gap-2">
              <img
                onClick={() => navigate("/profile")}
                src={
                  user.profilePic ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="User"
                className="w-16 h-16 rounded-full border-2 border-white hover:scale-105 transition"
              />
              <button
                onClick={() => {
                  Logout();
                  setIsMenuOpen(false);
                }}
                className="bg-white text-purple-700 font-semibold px-4 py-2 rounded-lg hover:bg-purple-200 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setIsMenuOpen(prev => !prev);
                navigate("/login");
              }}
              className="w-full bg-white text-purple-700 font-semibold px-4 py-2 rounded-lg hover:bg-purple-200 transition"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
