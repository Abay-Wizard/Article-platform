import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-linear-to-r from-purple-800 to-purple-600 text-white py-10 mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold mb-3">Article<span className="text-purple-200">Hub</span></h2>
          <p className="text-sm text-purple-200 leading-relaxed">
            Share your thoughts, explore insights, and connect with readers across the world.  
            ArticleHub empowers storytellers to inspire and inform.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-purple-200 transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-purple-200 transition">About</Link></li>
            <li><Link to="/connect" className="hover:text-purple-200 transition">Connect</Link></li>
            <li><Link to="/articles" className="hover:text-purple-200 transition">Articles</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/privacy" className="hover:text-purple-200 transition">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-purple-200 transition">Terms of Use</Link></li>
            <li><Link to="/faq" className="hover:text-purple-200 transition">FAQ</Link></li>
            <li><Link to="/support" className="hover:text-purple-200 transition">Support</Link></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 mt-2">
            <Link to="#" className="hover:text-purple-200 transition"><Facebook /></Link>
            <Link to="#" className="hover:text-purple-200 transition"><Twitter /></Link>
            <Link to="#" className="hover:text-purple-200 transition"><Instagram /></Link>
            <Link to="#" className="hover:text-purple-200 transition"><Linkedin /></Link>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-purple-400 mt-10 pt-6 text-center text-sm text-purple-200">
        <p>&copy; {new Date().getFullYear()} <span className="font-semibold">ArticleHub</span>. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
