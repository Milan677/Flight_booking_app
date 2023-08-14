const express=require("express");
const{connection}=require("./db");
const{userRouter}=require("./routes/user");
const{flightRouter}=require("./routes/flight");
const{bookingRouter}=require("./routes/booking")
const{authenticate}=require("./middleware/authentication")
require("dotenv").config();
const cookieParser=require("cookie-parser")

const app=express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.send(`welcome to flight booking platform
        user rout api: user/api,
        flight rout: fli/api/flights,
        booking: book/api/booking or dashboard
    `)
})

app.use(cookieParser())
app.use("/user",userRouter)
app.use(authenticate)
app.use("/fli",flightRouter)
app.use("/book",bookingRouter)

app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("connected with the database....")
    } catch (error) {
        console.log(error.message)
    }

    console.log(`app is running at port ${process.env.PORT}`)
})