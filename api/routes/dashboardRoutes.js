const express = require("express");
const router = express.Router();
const { getDashboardStats } = require("../controllers/dashboardController");
const verifierToken = require("../middlewares/authMiddleware")
const isAdmin = require("../middlewares/isAdmin")


router.get("/",verifierToken,isAdmin, getDashboardStats);

module.exports = router;
