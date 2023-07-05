const express=require( "express");
 const jwt=require ("jsonwebtoken");
const bcrypt =require( "bcrypt");
const nodemailer =require ("nodemailer");
const authmodels= require ("../models/authmodels.js")

class authcontroller{
    static sendOtp=async(email,res)=>{
        const  transporter=nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:"anant2113012@akgec.ac.in",
                password:"bhvhgfbb"
            },
        })
        const mailoptions={
            from:"anant2113012@akgec.ac.in",
            to:email,
            subject:"verify your email",
            html:`<b>your have been successfully registered</b>`,
        }
        await transporter.sendMail(mailoptions)
    }
    static userRegister=async(req,res)=>{
        const{username,email,password,Address}=req.body
        try {
            if(username && email && password && Address)
            {
               const isUser=await authmodels.findOne({email:email})
               if(isUser)
               {
                return res.status(400).json({message:"email already registered"})
               }
               else{
                const genSalt=await bcrypt.genSalt(10);
                const hashedPassword=await bcrypt.hash(password,genSalt);
                const task=authmodels({
                    username:username,
                    email:email,
                    password:hashedPassword,
                    Address:Address
                });
                const savedTask=await task.save();
                if(savedTask)
                {
                    authcontroller.sendOtp(email)            //calling the above function
                    return res.status(200).json({message:"user registered succesfully"})
                }
               }   
            }
            else
            {
                return res.status(400).json({message:"All fields are required"})
            }
        
    }
         catch (error) {
            return res.status(400).json({message:error.message})
        }
    
    }
    static userLogin=async(req,res)=>{
        const{email,password}=req.body
        try {
            if(email && password)
            {
               const isemail=await authmodels.findOne({email:email})
               if(isemail)
               {
                const ispasswordcorrect=await bcrypt.compare(password,isemail.password)
                if(ispasswordcorrect)
                {
                    const token = jwt.sign({ userId: isemail._id }, "hey Anant", {
                        expiresIn: "1d",
                })
                return res.status(200).json({message:"login successfull",token,name:isemail.name})
               }
               else{
                return res.status(400).json({message:"wrong credentials"})
               }
            }
            else{
                return res.status(400).json({message:"email not found"})
            }
           
        }
        else{
            return res.status(400).json({message:"all fields are required"})
        }

     } catch (error) {
            return res.status(400).json({message:error.message})
        }
    
}
static forgotPassword=async(req,res)=>{
    const{email,newPassword,verifyPassword}=req.body;
    try {
        const isGot=await authmodels.find({email,password})
        if(isGot.email==email)
        {
           if(newPassword==verifyPassword)
           {
            const genSalt=await bcrypt.genSalt(10);
            const hashedPassword=await bcrypt.hash(newPassword,genSalt);
            const newPass=new authmodels({
                   email:email,
                   newPassword:hashedPassword,
                   verifyPassword:hashedPassword            
            })
           isGot.password=hashedPassword;
            const savedPass=await newPass.save();
            if(savedPass)
            {
                return res.status(200).json({message:"password saved succesfully in the database"})
            } 
           }
           else{
            return res.status(400).json({message:"password does not match,please enter correct password"})
           }
        }
        else{
            return res.status(400).json({message:"you have entered wrong email Id"})
        }
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}
}
module.exports= authcontroller;

