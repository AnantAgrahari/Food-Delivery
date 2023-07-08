const express =require("express");
const bcrypt=require("bcrypt")
const checkUserAuthentication =require ("../middlewares/authmiddleware");
const authcontroller= require ("../controllers/authcontrollers");

const taskcontroller= require ("../controllers/taskcontrollers");
const router=express.Router();
router.post("/user/Register",authcontroller.userRegister);
router.post("/user/Login",authcontroller.userLogin);
router.post("/add/Dishes",checkUserAuthentication,taskcontroller.addDishes);
router.post("/accept/Order",checkUserAuthentication,taskcontroller.acceptOrder);
router.post("/forgot/Password",authcontroller.forgotPassword);
module.exports= router;