import React, { useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { serverUrl } from "../App";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      const result = await axios.post(`${serverUrl}/api/auth/send-otp`,{
        email
      }, {withCredentials:true})

      setStep(2);
      
    } catch (error) {
      console.log( error); 
    }
  }

  const handleVerifyOtp = async () => {
    try {
      const result = await axios.post(`${serverUrl}/api/auth/verify-otp`,{
        email, otp
      }, {withCredentials:true})

      setStep(3);
      
    } catch (error) {
      console.log( error); 
    }
  }

  const handleResetPassword = async () => {

    if(newPassword!==confirmNewPassword){
      return null;
    }

    try {
      const result = await axios.post(`${serverUrl}/api/auth/reset-password`,{
        email, newPassword
      }, {withCredentials:true})

      navigate("/signin")

      
    } catch (error) {
      console.log( error); 
    }
  }

  return (
    <div className="flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <div className="flex items-center gap-4 mb-4">
          <IoChevronBack
            size={22}
            className="text-[#ff4d2d] mt-1 cursor-pointer"
            onClick={() => navigate("/signin")}
          />
          <h1 className="text-2xl font-bold text-center text-[#ff4d2d]">
            Forgot Password
          </h1>
        </div>

        {step == 1 && (
          <div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block test-gray-700 font-medium mb-1"
              >
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                value={email}
                className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
                placeholder="Enter your email"
              />
            </div>

            <button
            onClick={handleSendOtp}
              className={`w-full font-semibold rounded-lg py-2 transition duration-200 bg-[#fc4323] text-white hover:bg-[#f12800] cursor-pointer`}
            >
              Sent OTP
            </button>
          </div>
        )}

        {step == 2 && (
          <div>
            <div className="mb-6">
              <label
                htmlFor="otp"
                className="block test-gray-700 font-medium mb-1"
              >
                Enter OTP
              </label>
              <input
                onChange={(e) => setOTP(e.target.value)}
                value={otp}
                className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
                placeholder="Enter OTP"
              />
            </div>

            <button
            onClick={handleVerifyOtp}
              className={`w-full font-semibold rounded-lg py-2 transition duration-200 bg-[#fc4323] text-white hover:bg-[#f12800] cursor-pointer`}
            >
              Verify
            </button>
          </div>
        )}

        {step == 3 && (
          <div>
            <div className="mb-6">
              <label
                htmlFor=" newPassword"
                className="block test-gray-700 font-medium mb-1"
              >
                New Password
              </label>
              <input
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
                placeholder="Enter new password"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor=" confirmPassword"
                className="block test-gray-700 font-medium mb-1"
              >
                Confirm Password
              </label>
              <input
              type="password"
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                value={confirmNewPassword}
                className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
                placeholder="Confirm password"
              />
            </div>

            <button
            onClick={handleResetPassword}
              className={`w-full font-semibold rounded-lg py-2 transition duration-200 bg-[#fc4323] text-white hover:bg-[#f12800] cursor-pointer`}
            >
              Reset Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
