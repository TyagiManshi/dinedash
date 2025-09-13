import jwt from "jsonwebtoken"

const genToken = async(userId) => {
    try {
        const token = await jwt.sign(
            {userId}, 
            process.env.JWT_SECRET,
            {expiresIn: "24h"}
        )
        return token;
    } catch (error) {
        console.log("Error generating token");
    }
}

export default genToken;
