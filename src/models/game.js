import mongoose from "mongoose";
import timestamp from "mongoose-timestamp";
const gameSchema = new mongoose.Schema({
    gameId : {
        type : String,
        required :true,
        trim : true,
        unique : true
    },
    player1 : {
        type : String,
        required : true,
        trim : true,
    },
    player2 : {
        type : String,
        required : true,
        trim : true,
    },
    player1Name : {
        type : String,
        trim : true,
    },
    player2Name : {
        type : String,
        trim : true,
    },
    turn : {
        type : String,
        required : true,
        trim : true,
    },
    0 : {
        type : String,
        trim : true,
        default : ""
    },
    1 : {
        type : String,
        trim : true,
        default : ""
    },
    2 : {
        type : String,
        trim : true,
        default : ""
    },
    3 : {
        type : String,
        trim : true,
        default : ""
    },
    4 : {
        type : String,
        trim : true,
        default : ""
    },
    5 : {
        type : String,
        trim : true,
        default : ""
    },
    6 : {
        type : String,
        trim : true,
        default : ""
    },
    7 : {
        type : String,
        trim : true,
        default : ""
    },
    8 : {
        type : String,
        trim : true,
        default : ""
    },
    winner : {
        type : String,
        trim : true,
        default : ""
    },
    isDraw : {
        type : Boolean,
        trim : true,
        default : false,
    },
    status : {
        type : String,
        trim : true,
        default : 'pending'
    }
});


gameSchema.plugin(timestamp);

const gameModel = mongoose.model('games',gameSchema);


export default gameModel;