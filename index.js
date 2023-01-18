import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
 

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
import authRouter from './src/router/authRouter.js';
import userRouter from "./src/router/userRouter.js";
import gamesRouter from "./src/router/gamesRouter.js";

app.use('/authenticate',authRouter);
app.use('/users',userRouter);
app.use('/games',gamesRouter);
app.use('/',(req,res)=>{res.json("Server ruinng!")})
 
const PORT = process.env.PORT || 8080

app.listen(PORT, ()=>{
   console.log(`Server is running on ${PORT}`);
});