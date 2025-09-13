import mongoose from "mongoose"
import dotenv from "dotenv"

const db = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connected to mongodb");
        
    } catch (error) {
        console.log("Error connecting to mongodb");
    }
}

export default db;