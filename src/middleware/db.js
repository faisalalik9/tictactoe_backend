import {MongoClient} from 'mongodb'
import mongoose from 'mongoose';

var uri = "mongodb://faisalalik9:Faisal1234@ac-edzcg1w-shard-00-00.wmg7pvq.mongodb.net:27017,ac-edzcg1w-shard-00-01.wmg7pvq.mongodb.net:27017,ac-edzcg1w-shard-00-02.wmg7pvq.mongodb.net:27017/?ssl=true&replicaSet=atlas-emf8qd-shard-0&authSource=admin&retryWrites=true&w=majority";


// const client = new MongoClient(uri,{
//     useNewUrlParser: true,
//     useUnifiedTopology : true
// });


async function database(){
    mongoose.connect(uri,{useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'tictactoe_db',})
    .then(function(db){
        console.log(db);
        console.log("DB Connected");
    })
    .catch(function(err){
        console.log("err : ",err);
    })
}

export default database