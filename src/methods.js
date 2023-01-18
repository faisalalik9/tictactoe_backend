import express from "express";
import database from "./middleware/db.js";
const app = express();


app.use(express.json());

const PORT = process.env.PORT || 8080

app.listen(PORT, ()=>{
console.log(`Server is running on ${PORT}`);
})


let users = [];

const userRouter = express.Router();
app.use('/user',userRouter);

 
userRouter.route('/')
.get(getUser)
.post(postUser)
.patch(updateUser)
.delete(deleteUser);



async function getUser(req,res,next){
    const result = await database(req,res,next);
    res.send(users);
}

function postUser(req,res){
    console.log(req.body);
    users=req.body;
    res.json({
        message : "Data entered successfully",
        user : req.body
    });
}

function updateUser(req,res){
    let temp = req.body;
    for(key in temp){
        users[key] = temp[key];
    }
    res.json({
        message:"Data updated successfully",
        data : users
    });
}

function deleteUser(req,res){
    users = [];
    res.json({
        message : "Data deleted successfully",
        data : users,
    })
}