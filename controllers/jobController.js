const Job = require("../models/Job");

exports.createJob =
async(req,res)=>{

try{

const {
title,
description,
location,
salary,
jobType,
experienceLevel,
skillsRequired,
company
} = req.body;

const job =
await Job.create({

title,
description,
location,
salary,
jobType,
experienceLevel,
skillsRequired,
company,
createdBy:req.user.id

});

res.status(201).json({
success:true,
job
});

}catch(error){

res.status(500).json({
message:error.message
});

}

};

exports.getAllJobs =
async(req,res)=>{

try{

const jobs =
await Job.find()
.populate("company");

res.json(jobs);

}catch(error){

res.status(500).json({
message:error.message
});

}

};

exports.getJobById =
async(req,res)=>{

try{

const job =
await Job.findById(
req.params.id
).populate("company");

res.json(job);

}catch(error){

res.status(500).json({
message:error.message
});

}

};

exports.updateJob =
async(req,res)=>{

try{

const job =
await Job.findByIdAndUpdate(
req.params.id,
req.body,
{new:true}
);

res.json(job);

}catch(error){

res.status(500).json({
message:error.message
});

}

};

exports.deleteJob =
async(req,res)=>{

try{

await Job.findByIdAndDelete(
req.params.id
);

res.json({
message:"Job Deleted"
});

}catch(error){

res.status(500).json({
message:error.message
});

}

};

exports.searchJobs =
async(req,res)=>{

try{

const keyword =
req.query.keyword;

const jobs =
await Job.find({

title:{
$regex:keyword,
$options:"i"
}

});

res.json(jobs);

}catch(error){

res.status(500).json({
message:error.message
});

}

};