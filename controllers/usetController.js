const User = require("../models/User");

exports.getProfile = async (req,res)=>{

try{

const user = await User.findById(req.user.id)
.select("-password");

res.json(user);

}catch(error){

res.status(500).json({
message:error.message
});

}

};

exports.uploadResume =
async(req,res)=>{

try{

const user =
await User.findById(req.user.id);

user.resume = req.file.path;

await user.save();

res.json({
success:true,
resume:user.resume
});

}catch(error){

res.status(500).json({
message:error.message
});

}

};