const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["jobseeker", "recruiter", "admin"],
      default: "jobseeker",
    },

    bio: {
      type: String,
    },

    education: {
      type: String,
    },

    experience: {
      type: String,
    },

    preferredLocation: {
      type: String,
    },

    preferredJobType: {
      type: String,
    },

    skills: [
      {
        type: String,
      },
    ],

    profilePicture: {
      type: String,
    },

    resume: {
      type: String,
    },

    phone: {
      type: String,
    },

    savedJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
