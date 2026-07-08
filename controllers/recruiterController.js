const Job = require("../models/Job");
const Application = require("../models/Application");
const User = require("../models/User");

const getDashboard = async (req, res) => {

    try {

        const recruiterId = req.user.id;

        const jobs = await Job.find({
            postedBy: recruiterId
        });

        const jobIds = jobs.map(job => job._id);

        const applications = await Application.find({
            job: { $in: jobIds }
        });

        const shortlisted = applications.filter(
            app => app.status === "Shortlisted"
        );

        const interviews = applications.filter(
            app => app.status === "Interview Scheduled"
        );

        res.json({

            totalJobs: jobs.length,

            applications: applications.length,

            shortlisted: shortlisted.length,

            interviews: interviews.length

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

const getRecruiterProfile = async (req, res) => {

    try {

        const recruiter = await User.findById(req.user.id)
            .select("-password");

        if (!recruiter) {

            return res.status(404).json({

                success: false,

                message: "Recruiter not found"

            });

        }

        res.status(200).json({

            success: true,

            recruiter

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {
    getDashboard,
    getRecruiterProfile
};