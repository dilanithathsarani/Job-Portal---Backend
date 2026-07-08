const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
    getDashboard,
    getUsers,
    deleteUser,
    getJobs,
    deleteJob,
    getApplications,
    updateApplicationStatus
} = require("../controllers/adminController");


// Admin dashboard
router.get(
    "/dashboard",
    protect,
    authorizeRoles("admin"),
    getDashboard
);


// Manage users
router.get(
    "/users",
    protect,
    authorizeRoles("admin"),
    getUsers
);


router.delete(
    "/users/:id",
    protect,
    authorizeRoles("admin"),
    deleteUser
);


// Manage jobs
router.get(
    "/jobs",
    protect,
    authorizeRoles("admin"),
    getJobs
);


router.delete(
    "/jobs/:id",
    protect,
    authorizeRoles("admin"),
    deleteJob
);

router.get(
    "/applications",
    protect,
    authorizeRoles("admin"),
    getApplications
);



router.put(
    "/applications/:id",
    protect,
    authorizeRoles("admin"),
    updateApplicationStatus
);


module.exports = router;