const fs = require("fs");
const path = require("path");

/**
 * Middleware à appeler en cas d’erreur après upload :
 * Supprime le fichier uploadé s’il existe.
 */
const cleanUploadedFile = (req, res, next) => {
  if (req.file && req.file.path) {
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error("Erreur lors de la suppression du fichier temporaire:", err.message);
      } else {
        console.log("Fichier temporaire supprimé :", req.file.path);
      }
    });
  }
  next();
};

module.exports = cleanUploadedFile;
