import express from "express";
import dotenv from "dotenv";

dotenv.config()

import db from "./config/db.js"
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js"
import cors from "cors"

const app = express()

const PORT = process.env.PORT || 4000

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRouter)

db();

app.listen(PORT, ()=>{
    console.log(`Server listening on PORT: ${PORT}`);
})

