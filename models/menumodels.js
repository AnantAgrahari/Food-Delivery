const mongoose= require ("mongoose")
const menuSchema=new mongoose.Schema({
    category:{
        type:String,
    },
    dishes:{
       type:String,
    },
    quantity:{
        type:Number,
    },
    size:{
        type:String,
    },
    amount:{
        type:Number,
    },
    images:{
        type:String,
    }
})
const menuModel=mongoose.model("create",menuSchema)
module.exports= menuModel;