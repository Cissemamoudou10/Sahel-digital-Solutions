const Realisation = require("../models/realisationModel");
const fs = require("fs");
const path = require("path");

// Obtenir toutes les réalisations
const getRealisations = async (req, res) => {
  try {
    const realisations = await Realisation.getAll();
    res.status(200).json(realisations);
  } catch (error) {
    console.error("Erreur lors de la récupération des réalisations:", error);
    res
      .status(500)
      .json({
        message: "Erreur serveur lors de la récupération des réalisations.",
      });
  }
};

// Obtenir une réalisation par ID
// const getRealisationById = async (req, res) => {
//   try {
//     const realisation = await Realisation.getById(req.params.id);
//     if (!realisation) {
//       return res.status(404).json({ message: "Réalisation non trouvée." });
//     }
//     res.status(200).json(realisation);
//   } catch (error) {
//     console.error("Erreur lors de la récupération de la réalisation:", error);
//     res.status(500).json({ message: "Erreur serveur lors de la récupération." });
//   }
// };

const getRealisationById = async (req, res) => {
  try {
    const realisation = await Realisation.getById(req.params.id);

    if (!realisation) {
      return res.status(404).json({ message: "Réalisation non trouvée." });
    }

    // Transformer le chemin relatif en URL complète
    if (realisation.imageUrl) {
      realisation.imageUrl = `${req.protocol}://${req.get("host")}${
        realisation.imageUrl
      }`;
    }

    res.status(200).json(realisation);
  } catch (error) {
    console.error("Erreur lors de la récupération de la réalisation:", error);
    res
      .status(500)
      .json({ message: "Erreur serveur lors de la récupération." });
  }
};

// Créer une nouvelle réalisation
const createRealisation = async (req, res) => {
  try {
    const { titre, categorie, description } = req.body;
    if (!titre || !categorie || !description) {
      if (req.file?.path) fs.unlink(req.file.path, () => {});
      return res.status(400).json({ message: "Tous les champs sont requis." });
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const newRealisation = await Realisation.create({
      titre,
      categorie,
      description,
      imageUrl,
    });

    res
      .status(201)
      .json({
        id: newRealisation.id,
        message: "Réalisation créée avec succès.",
      });
  } catch (error) {
    console.error("Erreur lors de la création de la réalisation:", error);
    if (req.file?.path) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Erreur suppression image:", err);
      });
    }
    res.status(500).json({ message: "Erreur serveur lors de la création." });
  }
};

// Modifier une réalisation
const updateRealisation = async (req, res) => {
  try {
    const { titre, categorie, description } = req.body;
    const realisation = await Realisation.getById(req.params.id);
    if (!realisation) {
      return res.status(404).json({ message: "Réalisation non trouvée." });
    }

    let imageUrl = realisation.imageUrl;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
      if (realisation.imageUrl) {
        const oldImagePath = path.join(__dirname, "..", realisation.imageUrl);
        fs.unlink(oldImagePath, (err) => {
          if (err) console.error("Erreur suppression image:", err.message);
        });
      }
    }

    const result = await Realisation.update(req.params.id, {
      titre,
      categorie,
      description,
      imageUrl,
    });

    res
      .status(200)
      .json({ message: "Réalisation mise à jour avec succès.", result });
  } catch (error) {
    console.error("Erreur lors de la mise à jour:", error);
    res.status(500).json({ message: "Erreur serveur lors de la mise à jour." });
  }
};

// Supprimer une réalisation
const deleteRealisation = async (req, res) => {
  try {
    const realisation = await Realisation.getById(req.params.id);
    if (!realisation) {
      return res.status(404).json({ message: "Réalisation non trouvée." });
    }

    if (realisation.imageUrl) {
      const imagePath = path.join(__dirname, "..", realisation.imageUrl);
      fs.unlink(imagePath, (err) => {
        if (err) console.error("Erreur suppression image:", err.message);
      });
    }

    await Realisation.remove(req.params.id);
    res.status(200).json({ message: "Réalisation supprimée avec succès." });
  } catch (error) {
    console.error("Erreur suppression réalisation:", error);
    res.status(500).json({ message: "Erreur serveur lors de la suppression." });
  }
};

// Recherche avec pagination
// const searchRealisations = async (req, res) => {
//   try {
//     const search = req.query.search || "";
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const offset = (page - 1) * limit;

//     const allowedSortFields = ["id", "titre", "categorie"];
//     const sortBy = allowedSortFields.includes(req.query.sortBy)
//       ? req.query.sortBy
//       : "id";
//     const order = req.query.order?.toUpperCase() === "ASC" ? "ASC" : "DESC";

//     const { total, rows } = await Realisation.searchRealisations({
//       search,
//       limit,
//       offset,
//       sortBy,
//       order,
//     });

//     res.json({
//       total,
//       page,
//       limit,
//       sortBy,
//       order,
//       data: rows,
//     });
//   } catch (err) {
//     console.error("Erreur recherche réalisation:", err);
//     res.status(500).json({ message: "Erreur serveur lors de la recherche." });
//   }
// };

const searchRealisations = async (req, res) => {
  try {
    const search = req.query.search || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const allowedSortFields = ["id", "titre", "categorie"];
    const sortBy = allowedSortFields.includes(req.query.sortBy)
      ? req.query.sortBy
      : "id";
    const order = req.query.order?.toUpperCase() === "ASC" ? "ASC" : "DESC";

    const { total, rows } = await Realisation.searchRealisations({
      search,
      limit,
      offset,
      sortBy,
      order,
    });

    const fullUrl = `${req.protocol}://${req.get("host")}`;
    const data = rows.map((realisation) => ({
      ...realisation,
      imageUrl: realisation.imageUrl
        ? `${fullUrl}${realisation.imageUrl}`
        : null,
    }));

    res.json({
      total,
      page,
      limit,
      sortBy,
      order,
      data,
    });
  } catch (err) {
    console.error("Erreur recherche réalisation:", err);
    res.status(500).json({ message: "Erreur serveur lors de la recherche." });
  }
};

module.exports = {
  getRealisations,
  getRealisationById,
  createRealisation,
  updateRealisation,
  deleteRealisation,
  searchRealisations,
};
