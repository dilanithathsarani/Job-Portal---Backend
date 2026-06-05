const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

exports.registerUser = async(req,res)=>{
    try{
const {name,email,password} = req.body;
const normalizedEmail = email?.trim().toLowerCase();
const normalizedPassword = password?.trim();

const existingUser = await User.findOne({email: normalizedEmail});

if(existingUser){
    return res.status(400).json({
        message:"User already exists"
    });
}

const hashedPassword =
await bcrypt.hash(normalizedPassword,10);

const user = await User.create({
    name,
    email: normalizedEmail,
    password:hashedPassword
});

res.status(201).json({
    success:true,
    user
});
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

exports.loginUser = async(req,res)=>{

try{

const {email,password} = req.body;
const normalizedEmail = email?.trim().toLowerCase();
const normalizedPassword = password?.trim();

const user =
await User.findOne({email: normalizedEmail});

if(!user){
return res.status(400).json({
message:"Invalid Credentials"
});
}

const isMatch =
await bcrypt.compare(
normalizedPassword,
user.password
);

if(!isMatch){

return res.status(400).json({
message:"Invalid Credentials"
});

}

const token =
generateToken(user._id);

res.json({
success:true,
token,
user
});

}catch(error){

res.status(500).json({
success:false,
message:error.message
});

}

};