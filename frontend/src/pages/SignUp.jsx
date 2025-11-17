import React, { useState } from "react";
import { userStore } from "../store/userStore";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

const SignUp = () => {
  const { SignUp,isSigningUp } = userStore();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [data, setData] = useState({
    fullName: "",
    profession: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleEvent = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const success = await SignUp(data);
      if (success) {
        navigate("/login");
      }
    } catch (error) {
     console.log(error)
    } 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Your Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            onChange={handleEvent}
            name="fullName"
            type="text"
            placeholder="Full name"
            value={data.fullName}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <input
            onChange={handleEvent}
            name="profession"
            type="text"
            placeholder="Profession"
            value={data.profession}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <input
            onChange={handleEvent}
            name="email"
            type="email"
            placeholder="Email address"
            value={data.email}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          {/* Password input */}
          <div className="relative">
            <input
              onChange={handleEvent}
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={data.password}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
              required
            />
            <div
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-purple-600 transition"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>

          {/* Confirm password input */}
          <div className="relative">
            <input
              onChange={handleEvent}
              name="confirmPassword"
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm password"
              value={data.confirmPassword}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
              required
            />
            <div
              onClick={() => setShowConfirm((prev) => !prev)}
              className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-purple-600 transition"
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSigningUp}
            className={`w-full bg-purple-600 cursor-pointer text-white p-3 rounded-lg font-semibold transition duration-300 
            ${isSigningUp ? "opacity-70 cursor-not-allowed" : "hover:bg-purple-700"}`}
          >
            {isSigningUp ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-600 font-medium hover:underline"
          >
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
