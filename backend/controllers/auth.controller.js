import User from "../models/user.model.js"
import bcyptjs from "bcryptjs"
import genToken from "../utils/token.js"
import cookieParser from "cookie-parser"

export const signUp = async(req, res) => {
    try {
        
        const {fullName, email, password, mobile, role } = req.body
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message:"User already exists."})
        }
        if(password.length < 6){
            return res.status(400).json({message:"Password must contain at least 6 characters."})
        }
        if(mobile.length < 10){
            return res.status(400).json({message:"Mobile number must contain 10 digits."})
        }

        const hashedPassword = await bcyptjs.hash(password, 10)
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

        const isMatch = await bcyptjs.compare(password, user.password)

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
