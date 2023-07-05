const mongoose =require ("mongoose")
const updateSchema=new mongoose.Schema({
     dishes:{
        type:String,
     },
     quantity:{
        type:Number,
     },
     size:{
        type:String
     }
})
const updateModel=mongoose.model("ok",updateSchema)
module.exports= updateModel