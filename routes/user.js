const express=require("express");
const userRouter=express.Router();

const{userModel}=require("../model/user.model");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

userRouter.post("/api/register",async(req,res)=>{
   const {name,email,password}=req.body;
   try {
    bcrypt.hash(password,10,async(err,hash)=>{
        if(err){
            res.send({"msg":"something went wrong"})
        }else{
            const user=new userModel({name,email,password:hash})
            await user.save();
            res.status(201).send({"msg":"new user has been registered"})
        }
    })
   } catch (error) {
       res.status(400).send({"msg":"something went wrong","error":error.message})
   }
})

//.......Login.............
userRouter.post("/api/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await userModel.find({email});
        if(user){
            bcrypt.compare(password,user[0].password,(err,result)=>{
               if(result){
                 var token=jwt.sign({userID:user[0]._id},process.env.passkey,{expiresIn:'5h'})

                 res.cookie('token',token);
                 res.status(201).send({"msg":"Login successfull","token":token})
               }else{
                res.send("wrong credentials")
               }
            })
        }else{
            res.send("wrong credentials")
        }
    } catch (error) {
        res.status(400).send({"msg":"something went wrong","error":error.message})
    }
})


module.exports={userRouter}
