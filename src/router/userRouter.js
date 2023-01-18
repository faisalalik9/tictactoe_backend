import express from "express";
import errorHandler from "../middleware/errorHandler.js";
import userModel from "../models/user.js";
const userRouter = express.Router();


userRouter.route('/:email')
.get(getUserById);


 

async function getUserById(req,res){
    let email = req.params.email;
    try{
        let user = await userModel.findOne({email : email});

        if(user){
            return res.json({
                message : "User accessed",
                data : user
            });
        }
        else{
            return res.json({
                message : "User doesn't exist",
            });
        }
    }
    catch(err){
        errorHandler(req,res);
    }
}






export default userRouter;