const express = require('express')
const app=express();
const port=80;
const mongoose = require('mongoose')
const bcrypt=require('bcrypt')
const FoodDelivery=require ("./routes/route.js")
const connection_url="mongodb://localhost:27017"
mongoose.set('strictQuery',true);
mongoose.connect(connection_url,{useNewUrlParser:true,useUnifiedTopology:true,family:4})
.then(()=>{
    console.log("MongoDb connected");
})
.catch((err)=>{
    console.log(err);
});
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("api is running......")
});
app.use("/",FoodDelivery);
app.listen(port,()=>{
    console.log(`api is running at port:${port}`);
})