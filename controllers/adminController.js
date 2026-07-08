const User = require("../models/User");
const Job = require("../models/Job");
const Application = require("../models/Application");

exports.getDashboard = async(req,res)=>{
     try{

        const totalUsers = await User.countDocuments();

        const totalEmployers = await User.countDocuments({
            role:"employer"
        });

        const totalJobs = await Job.countDocuments();

        const totalApplications =
        await Application.countDocuments();

        const applicationStatus =
        await Application.aggregate([

            {
                $group:{
                    _id:"$status",
                    count:{
                        $sum:1
                    }
                }
            }

        ]);




        const userRoles =
        await User.aggregate([

            {
                $group:{
                    _id:"$role",
                    count:{
                        $sum:1
                    }
                }
            }

        ]);



        res.json({

            success:true,

            data:{
                totalUsers,
                totalEmployers,
                totalJobs,
                totalApplications,
                applicationStatus,
                userRoles
            }

        });


    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }
};


exports.getUsers = async(req,res)=>{
try{

        const users = await User.find()
        .select("-password")
        .sort({
            createdAt:-1
        });


        res.json({

            success:true,
            users

        });


    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};


exports.deleteUser = async(req,res)=>{
 try{

        await User.findByIdAndDelete(
            req.params.id
        );


        res.json({

            success:true,
            message:"User deleted successfully"

        });


    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }
};


exports.getJobs = async(req,res)=>{
try{

        const jobs = await Job.find()

        .populate(
            "createdBy",
            "name email"
        )

        .populate(
            "company",
            "name"
        )

        .sort({
            createdAt:-1
        });


        res.json({

            success:true,
            jobs

        });


    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }
};


exports.deleteJob = async(req,res)=>{
 try{

        await Job.findByIdAndDelete(
            req.params.id
        );


        // remove related applications also
        await Application.deleteMany({
            job:req.params.id
        });


        res.json({

            success:true,
            message:"Job deleted successfully"

        });


    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }
};

exports.getApplications = async(req,res)=>{

    try{


        const applications =
        await Application.find()

        .populate(
            "applicant",
            "name email"
        )

        .populate(
            {
                path:"job",
                select:"title location salary",
                populate:{
                    path:"company",
                    select:"name"
                }
            }
        )

        .sort({
            createdAt:-1
        });



        res.json({

            success:true,

            applications

        });



    }
    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};

exports.updateApplicationStatus = async(req,res)=>{


    try{


        const {
            status
        } = req.body;



        const application =
        await Application.findByIdAndUpdate(

            req.params.id,

            {
                status
            },

            {
                new:true
            }

        );



        if(!application){

            return res.status(404).json({

                message:"Application not found"

            });

        }



        res.json({

            success:true,

            message:"Application status updated",

            application

        });



    }
    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};