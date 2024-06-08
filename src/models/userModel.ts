import mongoose, { mongo } from "mongoose"

const userSchema = new mongoose.Schema({
    username:{
        type:String,required:[true,"Please Provide a user name"],unique:true
    },
    email:{
        type:String , required:[true,"Please provide a emailId"],unique:true
    },
    password:{
        type:String , required:[true ,'please enter your password']
    },
    isverified:{
        type:Boolean , default:false
    },
    isAdmin:{
        type:Boolean , default:false
    },
    forgotPasswordToken: String ,
    forgotPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date
})

const User = mongoose.models.users || mongoose.model('users',userSchema);

export default User