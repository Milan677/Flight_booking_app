const express=require("express");
const flightRouter=express.Router();
const{flightModel}=require("../model/flight.model");

//........get all flights..........
flightRouter.get("/api/flights",async(req,res)=>{
    try {
        const flights=await flightModel.find();
        res.status(200).send({"all flights":flights})
    } catch (error) {
        res.status(400).send({"msg":"something went wrong","error":error.message})
    }
})

//.....get flight by id......
flightRouter.get("/api/flights/:id",async(req,res)=>{
    try {
        const flight=await flightModel.find({_id:req.params.id});
        if(!flight){
            res.status(400).send({"msg":"flight not found"})
        }
        res.status(200).send(flight)
    } catch (error) {
        res.status(400).send({"msg":"something went wrong","error":error.message})
    }
})

//........ add a flight.......
flightRouter.post("/api/flights",async(req,res)=>{
    try {
    const data=req.body;
    const flight=new flightModel(data);
    await flight.save();
    res.status(201).json({"msg":"new flight added"})
    } catch (error) {
        res.status(400).send({"msg":"something went wrong","error":error.message})
    }
    
  
})

//......delete.....

flightRouter.delete("/api/flights/:id",async(req,res)=>{
    try {
        let flight= await flightModel.findByIdAndDelete({_id:req.params.id});
        res.status(202).json({"msg":"flight deleted"})
    } catch (error) {
        res.status(400).send({"msg":"something went wrong","error":error.message})
    }
    
  
})



//........patch.......
flightRouter.patch("/api/flights/:id",async(req,res)=>{
    try {
        let flight= await flightModel.findByIdAndUpdate({_id:req.params.id},req.body);
        res.status(204).json({"msg":"flight details updated","flight":flight})
    } catch (error) {
        res.status(400).send({"msg":"something went wrong","error":error.message})
    }
    
  
})


module.exports={flightRouter}

