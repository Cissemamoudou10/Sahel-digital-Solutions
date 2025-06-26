const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifierToken = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");

router.get("/search", verifierToken, isAdmin, userController.searchUsers);
router.get("/", verifierToken, isAdmin, userController.getAllUsers);
router.get("/:id", verifierToken, isAdmin, userController.getUserById);
router.post("/", verifierToken, isAdmin, userController.createUser);
router.put("/:id", verifierToken, isAdmin, userController.updateUser);
router.delete("/:id", verifierToken, isAdmin, userController.deleteUser);

module.exports = router;
