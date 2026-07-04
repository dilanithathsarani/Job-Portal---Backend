const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    description:{
        type:String
    },

    website:{
        type:String
    },

    location:{
        type:String
    },

    logo:{
        type:String
    },

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},{
    timestamps:true
});

module.exports = mongoose.models.Company || mongoose.model("Company", companySchema);