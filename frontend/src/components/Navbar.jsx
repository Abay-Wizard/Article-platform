import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { userStore } from "../store/userStore";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, Logout } = userStore();
  const navigate = useNavigate();
  const desktopProfileRef = useRef(null);

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        desktopProfileRef.current &&
        !desktopProfileRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-linear-to-r from-purple-600 to-purple-800 text-white shadow-lg z-50">
      <div className="flex items-center justify-between px-5 md:px-10 py-3">
        {/* Logo */}
        <h1
          className="text-2xl md:text-3xl font-bold cursor-pointer select-none"
          onClick={() => navigate("/")}
        >
          Article<span className="text-purple-200">Hub</span>
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-lg font-medium">
          <li className="hover:text-purple-200 transition-colors">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-purple-200 transition-colors">
            <Link to="/about">About</Link>
          </li>
          <li className="hover:text-purple-200 transition-colors">
            <Link to="/connect">Connect</Link>
          </li>
        </ul>

        {/* Desktop User/Profile */}
        <div className="hidden md:flex items-center gap-4 relative" ref={desktopProfileRef}>
          {user ? (
            <div className="relative">
              <img
                onClick={() => setIsProfileOpen((prev) => !prev)}
                src={
                  user.profilePic ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="User"
                className="w-10 h-10 rounded-full object-cover cursor-pointer border-2 border-white hover:scale-105 transition-transform duration-200"
              />
              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-40 bg-purple-50 text-gray-800 rounded-lg shadow-xl overflow-hidden z-50 text-sm animate-fadeIn">
                  <ul className="flex flex-col">
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 hover:bg-purple-100 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/user-articles"
                        className="block px-4 py-2 hover:bg-purple-100 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Your Articles
                      </Link>
                    </li>
                    <li
                      className="block px-4 py-2 cursor-pointer hover:bg-purple-100 transition-colors"
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
              onClick={() => navigate("/login")}
              className="bg-white cursor-pointer text-purple-700 font-semibold px-4 py-2 rounded-lg hover:bg-purple-200 transition text-sm"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="cursor-pointer md:hidden">
          {isMenuOpen ? (
            <X size={30} onClick={() => setIsMenuOpen(false)} />
          ) : (
            <Menu size={30} onClick={() => setIsMenuOpen(true)} />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-purple-700 bg-opacity-95 py-5 px-6 space-y-5 text-center text-lg font-medium animate-slideDown">
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="block cursor-pointer hover:text-purple-200 transition"
          >
            Home
          </Link>
          <Link
            to="/post"
            onClick={() => setIsMenuOpen(false)}
            className="block cursor-pointer hover:text-purple-200 transition"
          >
            Create Post
          </Link>
          <Link
            to="/about"
            onClick={() => setIsMenuOpen(false)}
            className="block cursor-pointer hover:text-purple-200 transition"
          >
            About
          </Link>
          <Link
            to="/connect"
            onClick={() => setIsMenuOpen(false)}
            className="block cursor-pointer hover:text-purple-200 transition"
          >
            Connect
          </Link>
          <hr className="border-purple-400" />

          {user ? (
            <div className="space-y-2">
              <Link
                to="/profile"
                onClick={() => setIsMenuOpen(false)}
                className="block bg-purple-100 text-gray-800 rounded-lg py-2 hover:bg-purple-200 transition"
              >
                Profile
              </Link>
              <Link
                to="/user-articles"
                onClick={() => setIsMenuOpen(false)}
                className="block bg-purple-100 text-gray-800 rounded-lg py-2 hover:bg-purple-200 transition"
              >
                Your Articles
              </Link>
              <button
                onClick={() => {
                  Logout();
                  setIsMenuOpen(false);
                }}
                className="w-full bg-purple-100 text-gray-800 rounded-lg py-2 hover:bg-purple-200 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/login");
              }}
              className="w-full bg-white text-purple-700 font-semibold px-4 py-2 rounded-lg hover:bg-purple-200 transition text-sm"
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
