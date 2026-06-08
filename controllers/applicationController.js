const Application =
require("../models/Application");

const Job =
require("../models/Job");

exports.applyJob =
async(req,res)=>{

try{

const jobId = req.params.id;

const existingApplication =
await Application.findOne({
    applicant:req.user.id,
    job:jobId
});

if(existingApplication){

return res.status(400).json({
message:"Already Applied"
});

}

const application =
await Application.create({

applicant:req.user.id,
job:jobId

});

res.status(201).json({
success:true,
application

});

}catch(error){

res.status(500).json({
message:error.message
});

}

};

exports.getMyApplications =
async(req,res)=>{

try{

const applications =
await Application.find({
applicant:req.user.id
})
.populate("job");

res.json(applications);

}catch(error){

res.status(500).json({
message:error.message
});

}

};

exports.getJobApplicants =
async(req,res)=>{

try{

const applications =
await Application.find({
job:req.params.id
})
.populate("applicant");

res.json(applications);

}catch(error){

res.status(500).json({
message:error.message
});

}

};

exports.updateStatus =
async(req,res)=>{

try{

const application =
await Application.findById(
req.params.id
);

application.status =
req.body.status;

await application.save();

res.json(application);

}catch(error){

res.status(500).json({
message:error.message
});

}

};