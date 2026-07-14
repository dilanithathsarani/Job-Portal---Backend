const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    location:{
        type:String
    },

    salary:{
        type:Number
    },

    jobType:{
        type:String
    },

    experienceLevel:{
        type:String
    },

    skillsRequired:[{
        type:String
    }],

    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Company"
    },

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

},{
    timestamps:true
});

module.exports = mongoose.models.Job || mongoose.model("Job", jobSchema);