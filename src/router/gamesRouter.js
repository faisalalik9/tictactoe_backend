import express from "express";
import userModel from "../models/user.js";
import gameModel from "../models/game.js";
import errorHandler from "../middleware/errorHandler.js";
import { v4 as uuidv4 } from 'uuid';

const gamesRouter = express.Router();


gamesRouter.route('/')
.get(getGames)
.post(createGame);

gamesRouter.route('/:email')
.get(getGamesByEmail);

gamesRouter.route('/gameById/:id')
.get(getGameById)

gamesRouter.route('/update')
.patch(updateGame);



async function getGames(req,res){
    try{
        let games = await gameModel.find();
        res.json({
            message : "Games list retrieved!",
            data : games
        });

    }
    catch(err){
        errorHandler(req,res);
        console.log("error: ",err);
    }
}


async function getGamesByEmail(req,res){
    try{
        let obj = req.params;
        let res1 = await gameModel.find({player1 : obj.email});
        let res2 = await gameModel.find({player2 : obj.email});

        let games = res1;
        res2.map(o=>{
            games.push(o);
        });
        res.json({
            message : "Games list retrieved!",
            data : games
        });

    }
    catch(err){
        errorHandler(req,res);
        console.log("error: ",err);
    }
}

async function getGameById(req,res){
    try{
        let gameId = req.params.id;
        let game = await gameModel.findOne({gameId : gameId});
        res.json({
            message : 'Game accessed',
            data : game
        })
    }
    catch(err){
        errorHandler(req,res);
        console.log("error: ",err);
    }
}



async function createGame(req,res){
    try{
        let obj = req.body;
        obj.gameId = uuidv4();
        let game = await gameModel.create(obj);
        res.json({
            message : "Game created successfully!",
            data : game
        })
    }
    catch(err){
        errorHandler(req,res);
        console.log("error: ",err);
    }
}

async function updateGame(req,res){
    try{
        let dataToBeUpdated = req.body;
        await gameModel.findOneAndUpdate({gameId:dataToBeUpdated.gameId},dataToBeUpdated);
        let game = await gameModel.findOne({gameId : dataToBeUpdated.gameId});
        res.json({
            message : "Game Updated successfully!",
            data : game
        })
    }
    catch(err){
        errorHandler(req,res);
        console.log("error: ",err);
    }
}
 

// async function loginUser(req, res){
//     try{
//         let data = req.body;
//         let user = await userModel.findOne({username : data.username});
//         if(user){
//             bcrypt.compare(data.password,user.password)
//             .then((result)=>{
//                  if(result){
//                     res.cookie('isLoggedIn',true,{maxAge:1000*60*60*24, domain: 'mydomain.com', secure:true, httpOnly:true})
//                     return res.json({
//                         message : "User has logged in",
//                         userDetails : user
//                     });
//                  }
//                  else{
//                     return res.json({
//                         message : "Wrong Credentials"
//                     });
//                  }
//             })
//             .catch(err=>{
//                 console.log(err);
//                 throw err;
//             })
//         }
             
//         else{
//             return res.json({
//                 message : "User not found"
//             })
//         }
//     }
//     catch(err){
//         errorHandler(req,res);
//     }
// }




export default gamesRouter;