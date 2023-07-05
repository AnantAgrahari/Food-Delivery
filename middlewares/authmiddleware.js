const jwt= require( "jsonwebtoken")
const authmodels =require ("../models/authmodels.js")
const checkUserAuthentication=async(req,res,next)=>{
    let token;
    const {authorization}=req.headers;
    if(authorization && authorization.startsWith("Bearer")){
        try {
            token=authorization.split("")[1];
            const{userId}=jwt.verify(token,"hey anant");
            req.user=await authmodels.findById(userId).select("--password");
            next();
        } catch (error) {
            return res.status(400).json({message:"unauthorised user"});
        }
    }
    else{
        return res.status(400).json({message:"invalid user"})
    }
}
        module.exports= checkUserAuthentication;