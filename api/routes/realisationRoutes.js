const express = require("express");
const router = express.Router();
const realisationController = require("../controllers/realisationController");
const upload = require("../configs/multer");
const verifierToken = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");

router.get("/search", realisationController.searchRealisations);

router.get("/", verifierToken, isAdmin, realisationController.getRealisations);

router.get("/:id",verifierToken, isAdmin, realisationController.getRealisationById);

router.post(
  "/",
  verifierToken,
  isAdmin,
  upload.single("image"),
  realisationController.createRealisation
);

router.put(
  "/:id",
  verifierToken,
  isAdmin,
  upload.single("image"),
  realisationController.updateRealisation
);

router.delete(
  "/:id",
  verifierToken,
  isAdmin,
  realisationController.deleteRealisation
);

module.exports = router;
