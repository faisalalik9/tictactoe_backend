 import express from "express";
 import cors from "cors";
import cookieParser from "cookie-parser";
 

 const app = express();


 app.use(cors());
 app.use(express.json());
 app.use(express.urlencoded({extended:true}));
 app.use(cookieParser());
 import authRouter from './router/authRouter.js';
 import userRouter from "./router/userRouter.js";
import gamesRouter from "./router/gamesRouter.js";

  app.use('/authenticate',authRouter);
  app.use('/users',userRouter);
  app.use('/games',gamesRouter);
 
 
 const PORT = process.env.PORT || 8080

 app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
 })