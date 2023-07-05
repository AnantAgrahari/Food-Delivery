const menumodels=require("../models/menumodels.js")
const updatemodels= require ("../models/updatemodels.js")
class taskcontroller{
    static addDishes=async(req,res)=>{
        const{category,dishes,size,quantity,amount,images}=req.body;
        try {
            if(category && dishes && size && quantity && amount && images)
            {
               const addMenu=new menumodels({
                category:category,
                dishes:dishes,
                size:size,
                quantity:quantity,
                amount:amount,
                images:images
               })   
               
               const savedMenu=await addMenu.save();
               if(savedMenu)
               {
                return res.status(200).json({message:"Dishes added succesfully"})
               }
               else{
                return res.status(400).json({message:"Please try again"})
               }
            }
            else{
                return res.status(400).json({message:"insufficient data to place your order"})
            }
        }
        catch (error) {
            return res.status(400).json({message:error.message})
        }
    }
    static acceptOrder=async(req,res)=>{
        const{dishes,quantity,size}=req.body;
        try {
            if(dishes && quantity && size)
            {
                const leftOrder=await menumodels.findOne({quantity})
                if(leftOrder)
                {
                    if(leftOrder.quantity<quantity)
                    {
                        return res.status(200).json({message:"currently item not available,please select some other item!!!"})
                    } 
                    else{
                        const addOrder=new updatemodels({
                            dishes:dishes,
                            quantity:quantity,
                           size:size 
                          })          
                          const hotel=await addOrder.save();
                          if(hotel)
                          {
                            return res.status(200).json({message:"your order has been placed"})
                          }
                          else{
                            return res.status(400).json({message:"order failed,please try again!"})
                          }
                          quantity=(leftOrder.quantity-quantity)
                          const idOk=await updatemodels.findByIdAndUpdate({_id : leftOrder._id}, {quantity}) 
                        return res.status(200).json({message:"order updated successfully"})                    }
                }
                else{
                    return res.status(400).json({message:"service unavailable"})
                }
             
            }
            else{
                return res.status(400).json({message:"insufficient info"})
            }
        } catch (error) {
            return res.status(400).json({message:error.message})
        }
    }
   
}
module.exports= taskcontroller 