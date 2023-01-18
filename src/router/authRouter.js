import express from "express";
import database from "../middleware/db.js";
import userModel from "../models/user.js";
import errorHandler from "../middleware/errorHandler.js";
import bcrypt from "bcrypt";

const authRouter = express.Router();

 
authRouter.route('/signup')
.get(getSignUp)
.post(postSignUp)

authRouter.route('/login')
.post(loginUser);


await database();

async function getSignUp(req,res,next){
    console.log("Get Signup called");
    next();
}

async function postSignUp(req,res,next){
    try{
        console.log("Connected");
        let obj = req.body;
        console.log("prev",obj)
        let user = await userModel.create(obj);
        console.log('backend',obj);
        res.json({
            message : "User signed up!",
            data : user
        });
    }
    catch(err){
        errorHandler(req,res);
    }
    
}

async function loginUser(req, res){
    try{
        let data = req.body;
        let user = await userModel.findOne({username : data.username});
        if(user){
            bcrypt.compare(data.password,user.password)
            .then((result)=>{
                 if(result){
                    // res.setHeader('Set-Cookie','isLoggedIn=true');
                    res.cookie('isLoggedIn',true,{maxAge:1000*60*60*24, domain: 'mydomain.com', secure:true, httpOnly:true})
                    return res.json({
                        message : "User has logged in",
                        userDetails : user
                    });
                 }
                 else{
                    return res.json({
                        message : "Wrong Credentials"
                    });
                 }
            })
            .catch(err=>{
                console.log(err);
                throw err;
            })
        }
             
        else{
            return res.json({
                message : "User not found"
            })
        }
    }
    catch(err){
        errorHandler(req,res);
    }
}





 


export default authRouter;