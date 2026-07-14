const express = require("express");
const router = express.Router();

const protect =
require("../middleware/authMiddleware");

const {
createCompany,
getMyCompanies
} = require("../controllers/companyController");

router.post(
"/create",
protect,
createCompany
);

router.get("/my-companies", protect, getMyCompanies);

module.exports = router;