import React, { useState } from 'react';
import { userStore } from '../store/userStore';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const SignIn = () => {
  const { Login,isLoggingIn } = userStore();
  const navigate = useNavigate();
  const [data, setData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await Login(data);
      if (success) {
        navigate('/');
      } 
      
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 sm:p-8">
        <h1 className="text-2xl font-bold mb-6 text-purple-600 text-center">
          Sign In
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
            required
            className="border p-3 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <div className="relative">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
              required
              className="border p-3 rounded-md w-full text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
          <button
            type="submit"
            disabled={isLoggingIn}
            className="bg-purple-600 text-white p-3 cursor-pointer rounded-md hover:bg-purple-700 transition text-base font-medium"
          >
            {isLoggingIn? 'Signing in ...' :'Sign In'}
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-500 text-center">
          Don't have an account?{' '}
          <Link to="/signup" className="text-purple-600 hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
