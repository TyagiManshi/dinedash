import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import genToken from "../utils/token.js"
import cookieParser from "cookie-parser"
import {sendOtpMail} from "../utils/mail.js"

export const signUp = async(req, res) => {
    try {
        
        const {fullName, email, password, mobile, role } = req.body
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({error:"User already exists."})
        }
        if(password.length < 6){
            return res.status(400).json({message:"Password must contain at least 6 characters."})
        }
        if(!/^\d{10}$/.test(mobile)){
            return res.status(400).json({message:"Mobile number must contain 10 digits."})
        }

        const hashedPassword = await bcryptjs.hash(password, 10)
        user = await User.create({
            fullName,
            email,
            role,
            password:hashedPassword,
            mobile
        })

        const token = await genToken(user._id)
        res.cookie("token", token, {
            secure:false,
            sameSite:"strict",
            maxAge: 24*60*60*1000,
            httpOnly:true
        })

        return res.status(201).json(user)

    } catch (error) {
        return res.status(500).json(`Sign up error: ${error}`)
    }
}

export const signIn = async(req, res) => {
    try {
        
        const {email, password} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"User does not exist."})
        }

        const isMatch = await bcryptjs.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({message: "Incorrect Password."})
        }

        return res.status(200).json(user)

    } catch (error) {
        return res.status(500).json(`Sign in error: ${error}`)
    }
}

export const signOut = async(req, res) => {
    try {
        
        res.clearCookie("token")
        return res.status(200).json({message: "Logged Out Successfully."})

    } catch (error) {
        return res.status(500).json(`Sign out error: ${error}`)
    }
}

export const sendOtp = async(req, res) => {
    try {
        const {email} = req.body;
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"User does not exist"})
        }
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        user.resetOtp = otp;
        user.otpExpires = Date.now() + 5*60*1000;
        user.isOtpVerified = false;
        await user.save();

        await sendOtpMail(email, otp)

        return res.status(200).json({message: "OTP Sent"})

    } catch (error) {
        return res.status(500).json({message: "OTP failed", error})
    }
}

export const verifyOtp = async(req, res) => {
    try {
        const {email, otp} = req.body 
        const user = await User.findOne({email})
        if(!user || user.resetOtp!=otp || user.otpExpires<Date.now()){
            return res.status(400).json({message:"Invalid OTP"})
        }
        user.resetOtp = undefined;
        user.isOtpVerified = true;
        user.otpExpires = undefined;
        await user.save();

        return res.status(200).json({message:"OTP verified"})

    } catch (error) {
        return res.status(400).json({message:"Something went wrong in verifying otp."})
    }
}

export const resetPassword = async(req, res) => {
    try {
        const {email, newPassword} = req.body 
        const user = await User.findOne({email})
        if(!user || !user.isOtpVerified){
            return res.status(400).json({message:"OTP verification required"})
        }

        const hashedPassword = await bcryptjs.hash(newPassword, 10);
        user.password = hashedPassword
        user.isOtpVerified = false;

        await user.save();

        return res.status(200).json({message:"Password reset successfully"})


    } catch (error) {
        return res.status(500).json({message:"Something went wrong in reset password."})
    }
}

