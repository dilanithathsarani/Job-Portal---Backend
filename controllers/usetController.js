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

exports.updateUserRole = async (req, res) => {

    try {

        const { role } = req.body;


        const allowedRoles = [
            "jobseeker",
            "employer",
            "admin"
        ];


        if (!allowedRoles.includes(role)) {

            return res.status(400).json({
                success: false,
                message: "Invalid role"
            });

        }



        const user = await User.findByIdAndUpdate(

            req.params.id,

            {
                role: role
            },

            {
                new: true
            }

        ).select("-password");



        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }



        res.json({

            success: true,

            message: "User role updated successfully",

            user

        });


    } catch(error) {


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

};