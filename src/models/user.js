import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        trim : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true
    },
    name : {
        type : String,
        required : true,
        trim : true,
        unique : false
    },
    password : {
        type : String,
        required : true
    }

});


userSchema.pre('save',async function(){
    let salt = await bcrypt.genSalt();
    let hashedString = await bcrypt.hash(this.password, salt);
    this.password = hashedString;
})


const userModel = mongoose.model('Users',userSchema);




export default userModel;