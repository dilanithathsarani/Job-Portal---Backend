const User = require("../models/User");

exports.updateProfile = async (req,res)=>{

try{

const {
bio,
education,
experience,
skills
} = req.body || {};

const user =
await User.findById(req.user.id);

if(!user){

return res.status(404).json({
message:"User not found"
});

}

user.bio = bio || user.bio;
user.education = education || user.education;
user.experience = experience || user.experience;
user.skills = skills || user.skills;

await user.save();

res.json({
success:true,
user
});

}catch(error){

res.status(500).json({
message:error.message
});

}

};