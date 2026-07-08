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


        res.json({

            success:true,

            data:{
                totalUsers,
                totalEmployers,
                totalJobs,
                totalApplications
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