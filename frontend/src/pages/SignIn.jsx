import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { serverUrl } from "../App";

const SignIn = () => {
  const primaryColor = "#ff4d2d";
  const bgColor = "#fff9f6";
  const hoverColor = "#e64323";
  const borderColor = "#ddd";

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignin = async () => {
    try {
      const result = await axios.post(`${serverUrl}/api/auth/signin`,{
        email, password
      }, {withCredentials:true})
      console.log(result);
      
    } catch (error) {
      console.log( error); 
    }
  }

  return (
    <div
      className="min-h-screen flex w-full items-center justify-center p-4"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px]`}
        style={{ border: `1px solid ${borderColor}` }}
      >
        <h1
          className={`text-3xl font-bold mb-2`}
          style={{ color: primaryColor }}
        >
          DineDash
        </h1>
        <p className="text-gray-600 mb-8">
          Sign In to your account to get started with delicious food deliveries
        </p>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block test-gray-700 font-medium mb-1"
          >
            Email
          </label>
          <input
          onChange={(e)=>setEmail(e.target.value)}
            type="email"
            value={email}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
            placeholder="Enter your email"
            style={{ border: `1px solid ${borderColor}` }}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-1"
          >
            Password
          </label>
          <div className="relative">
            <input
            onChange={(e)=>setPassword(e.target.value)}
            value={password}
              type={showPassword ? "text" : "password"}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
              placeholder="Enter a strong password"
              style={{ border: `1px solid ${borderColor}` }}
            />
            <button
              type="button"
              className="absolute cursor-pointer right-3 top-3 text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="text-right cursor-pointer mb-4 text-[#ff4d2d]" onClick={()=>navigate('/forgot-password')}>
            Forgot Password
        </div>

        <button
          className={`w-full font-semibold rounded-lg py-2 transition duration-200 bg-[#fc4323] text-white hover:bg-[#f12800] cursor-pointer`}
        onClick={handleSignin}
        >
          Sign In
        </button>

        <button className="w-full mt-4 flex items-center justify-center gap-2 border border-gray-400 rounded-lg px-4 py-2 cursor-pointer transition duration-200 hover:bg-gray-200">
          <FcGoogle size={20} />
          <span>Sign in with Google</span>
        </button>

        <p
          className="text-center mt-6 cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Do not have an account ?{" "}
          <span className="text-[#ff4d2d] cursor-pointer">Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
