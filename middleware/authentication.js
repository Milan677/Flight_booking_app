const jwt=require("jsonwebtoken")
const{userModel}=require("../model/user.model");
require("dotenv").config();
const authenticate=async(req,res,next)=>{
    try {
        const token=req.cookies.token;

        if(token){
            const decodeToken=jwt.verify(token,process.env.passkey);
            const{userID}=decodeToken;

            const user=await userModel.findById(userID);
            if(!user){
                return res.status(401).json({message:`pls Login`})
            }

            req.user=user;

            next()
        }
    } catch (error) {
        res.status(401).json({message:`pls login 2`})
    }
}

module.exports={authenticate}