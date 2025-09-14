import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { serverUrl } from "../App";

const SignUp = () => {
  const primaryColor = "#ff4d2d";
  const bgColor = "#fff9f6";
  const hoverColor = "#e64323";
  const borderColor = "#ddd";

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("User");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const result = await axios.post(`${serverUrl}/api/auth/signup`,{
        fullName, email, password, mobile, role
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
        className={`bg-white rounded-xl shadow-lg w-full max-w-max p-8 border-[1px]`}
        style={{ border: `1px solid ${borderColor}` }}
      >
        <h1
          className={`text-3xl font-bold mb-2`}
          style={{ color: primaryColor }}
        >
          DineDash
        </h1>
        <p className="text-gray-600 mb-8">
          Create your account to get started with delicious food deliveries
        </p>

        <div className="mb-4">
          <label
            htmlFor="fullname"
            className="block test-gray-700 font-medium mb-1"
          >
            Full Name
          </label>
          <input
          onChange={(e)=>setFullName(e.target.value)}
            type="text"
            value={fullName}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
            placeholder="Enter your full name"
            style={{ border: `1px solid ${borderColor}` }}
          />
        </div>

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

        <div className="mb-4">
          <label
            htmlFor="mobile"
            className="block text-gray-700 font-medium mb-1"
          >
            Contact
          </label>
          <input
          onChange={(e)=>setMobile(e.target.value)}
            type="tel"
            value={mobile}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
            placeholder="Enter your contact number"
            style={{ border: `1px solid ${borderColor}` }}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="role"
            className="block text-gray-700 font-medium mb-1"
          >
            Role
          </label>
          <div className="flex gap-2">
            {["User", "Owner", "Delivery Person"].map((r) => (
              <button
                className="flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors cursor-pointer"
                onClick={() => setRole(r)}
                style={
                  role == r
                    ? { backgroundColor: primaryColor, color: "white" }
                    : {
                        border: `1px solid ${primaryColor}`,
                        color: primaryColor,
                      }
                }
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <button
          className={`w-full font-semibold rounded-lg py-2 transition duration-200 bg-[#fc4323] text-white hover:bg-[#f12800] cursor-pointer`}
        onClick={handleSignup}
        >
          Sign Up
        </button>

        <button className="w-full mt-4 flex items-center justify-center gap-2 border border-gray-400 rounded-lg px-4 py-2 cursor-pointer transition duration-200 hover:bg-gray-200">
          <FcGoogle size={20} />
          <span>Sign up with Google</span>
        </button>

        <p
          className="text-center mt-6 cursor-pointer"
          onClick={() => navigate("/signin")}
        >
          Already have an account ?{" "}
          <span className="text-[#ff4d2d] cursor-pointer">Sign In</span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
