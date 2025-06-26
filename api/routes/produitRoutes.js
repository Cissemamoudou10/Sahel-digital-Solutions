const express = require("express");
const router = express.Router();
const produitController = require("../controllers/produitController");
const upload = require("../configs/multer");
const verifierToken = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");

router.get(
  "/search",

  produitController.getProductByDynamicSearch
);
router.get("/", verifierToken, isAdmin, produitController.getProduits);
router.get("/:id", verifierToken, isAdmin,produitController.getProduitById);
router.post(
  "/",
  verifierToken,
  isAdmin,
  upload.single("image"),
  produitController.createProduit
);
router.put(
  "/:id",
  verifierToken,
  isAdmin,
  upload.single("image"),
  produitController.updateProduit
);
router.delete("/:id", verifierToken, isAdmin, produitController.deleteProduit);

module.exports = router;
