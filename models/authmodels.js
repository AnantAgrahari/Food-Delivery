const express =require ("express");
const mongoose= require ("mongoose");
const authSchema=new mongoose.Schema({
    username:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    Address:{
        type:String,
    },
    newPassword:{
    type:String,
    },
    verifyPassword:{
        type:String,
    }
})
const authModel=mongoose.model("auth",authSchema);
module.exports= authModel;