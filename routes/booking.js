const express=require("express");
const bookingRouter=express.Router();

const{bookingModel}=require("../model/booking.model")

bookingRouter.post("/api/booking",async(req,res)=>{
    const{userId,flightId}=req.body;
    try {
        const booking=new bookingModel({user:userId,flight:flightId});
        await booking.save();
        res.status(201).json("new flight booked")
    } catch (error) {
        res.status(400).send({"msg":"something went wrong","error":error.message})
    }
})

//......update booking.......
bookingRouter.patch("/api/dashboard/:id",async(req,res)=>{
    try {
        let flight= await bookingModel.findByIdAndUpdate({_id:req.params.id},req.body);
        res.status(204).json({"msg":"booking details updated","flight":flight})
    } catch (error) {
        res.status(400).send({"msg":"something went wrong","error":error.message})
    }
    
  
})

bookingRouter.delete("/api/dashboard/:id",async(req,res)=>{
    try {
        let flight= await bookingModel.findByIdAndDelete({_id:req.params.id});
        res.status(202).json({"msg":"booking details deleted"})
    } catch (error) {
        res.status(400).send({"msg":"something went wrong","error":error.message})
    }
    
  
})

//....populate booking details.....
bookingRouter.get("/api/dashboard",async(req,res)=>{
    try {
        const booking=await bookingModel.find().populate('flight user');
    res.status(200).json({"booking":booking})
    } catch (error) {
        res.status(400).send({"msg":"something went wrong","error":error.message})
    }
    
})



module.exports={bookingRouter}