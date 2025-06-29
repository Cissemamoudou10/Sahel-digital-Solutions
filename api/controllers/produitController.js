const Produit = require("../models/produitModel");
const fs = require("fs");
const path = require("path");

// Obtenir tous les produits
const getProduits = async (req, res) => {
  try {
    const produits = await Produit.getAll();
    res.status(200).json(produits);
  } catch (error) {
    console.error("Erreur lors de la récupération des produits:", error);
    res.status(500).json({ message: "Erreur serveur lors de la récupération des produits." });
  }
};

// Obtenir un produit par son ID
// const getProduitById = async (req, res) => {
//   try {
//     const produit = await Produit.getById(req.params.id);
//     if (!produit) {
//       return res.status(404).json({ message: "Produit non trouvé." });
//     }
//     res.status(200).json(produit);
//   } catch (error) {
//     console.error("Erreur lors de la récupération du produit:", error);
//     res.status(500).json({ message: "Erreur serveur lors de la récupération du produit." });
//   }
// };

const getProduitById = async (req, res) => {
  try {
    const produit = await Produit.getById(req.params.id);
    if (!produit) {
      return res.status(404).json({ message: "Produit non trouvé." });
    }

    // Construire l'URL absolue pour l'image
    // const baseUrl = `${req.protocol}://${req.get("host")}`; // ex: http://localhost:5000
    const baseUrl = process.env.BASE_URL;
    const produitAvecUrlAbsolue = {
      ...produit,
      imageUrl: `${baseUrl}${produit.imageUrl}` // Pas de slash entre baseUrl et imageUrl car imageUrl commence déjà par /
    };

    res.status(200).json(produitAvecUrlAbsolue);
  } catch (error) {
    console.error("Erreur lors de la récupération du produit:", error);
    res.status(500).json({ message: "Erreur serveur lors de la récupération du produit." });
  }
};


// Créer un nouveau produit
const createProduit = async (req, res) => {
  try {
    const { nom, categorie, prix, stock, description } = req.body;
    if (!nom || !categorie || !prix || !stock || !description) {
      if (req.file?.path) fs.unlink(req.file.path, () => {});
      return res.status(400).json({ message: "Tous les champs sont requis." });
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const newProduit = await Produit.create({
      nom,
      categorie,
      prix,
      stock,
      description,
      imageUrl,
    });

    res.status(201).json({ id: newProduit.id, message: "Produit créé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la création du produit:", error);
    if (req.file?.path) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Erreur lors de la suppression du fichier:", err);
      });
    }
    res.status(500).json({ message: "Erreur serveur lors de la création du produit." });
  }
};

// Mettre à jour un produit
const updateProduit = async (req, res) => {
  try {
    const { nom, categorie, prix, stock, description } = req.body;

    const produit = await Produit.getById(req.params.id);
    if (!produit) {
      return res.status(404).json({ message: "Produit non trouvé." });
    }

    let imageUrl = produit.imageUrl;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
      if (produit.imageUrl) {
        const oldImagePath = path.join(__dirname, "..", produit.imageUrl);
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error("Erreur lors de la suppression de l'ancienne image:", err.message);
          } else {
            console.log("Ancienne image supprimée :", produit.imageUrl);
          }
        });
      }
    }

    const result = await Produit.update(req.params.id, {
      nom,
      categorie,
      prix,
      stock,
      description,
      imageUrl,
    });

    res.status(200).json({ message: "Produit mis à jour avec succès.", result });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du produit:", error);
    res.status(500).json({ message: "Erreur serveur lors de la mise à jour du produit." });
  }
};

// Supprimer un produit
const deleteProduit = async (req, res) => {
  try {
    const produit = await Produit.getById(req.params.id);
    if (!produit) {
      return res.status(404).json({ message: "Produit non trouvé." });
    }

    if (produit.imageUrl) {
      const imagePath = path.join(__dirname, "..", produit.imageUrl);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Erreur lors de la suppression de l'image:", err.message);
        } else {
          console.log("Image supprimée :", produit.imageUrl);
        }
      });
    }

    await Produit.remove(req.params.id);
    res.status(200).json({ message: "Produit supprimé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression du produit:", error);
    res.status(500).json({ message: "Erreur serveur lors de la suppression du produit." });
  }
};

// Recherche dynamique avec pagination et tri
// const getProductByDynamicSearch = async (req, res) => {
//   try {
//     const search = req.query.search || "";
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const offset = (page - 1) * limit;

//     const allowedSortFields = ["id", "nom", "categorie", "prix", "stock"];
//     const sortBy = allowedSortFields.includes(req.query.sortBy)
//       ? req.query.sortBy
//       : "id";
//     const order = req.query.order?.toUpperCase() === "ASC" ? "ASC" : "DESC";

//     const { total, rows } = await Produit.searchProduits({
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
//     console.error("Erreur recherche dynamique:", err);
//     res.status(500).json({ message: "Erreur serveur lors de la recherche." });
//   }
// };

const getProductByDynamicSearch = async (req, res) => {
  try {
    const search = req.query.search || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const allowedSortFields = ["id", "nom", "categorie", "prix", "stock"];
    const sortBy = allowedSortFields.includes(req.query.sortBy)
      ? req.query.sortBy
      : "id";
    const order = req.query.order?.toUpperCase() === "ASC" ? "ASC" : "DESC";

    const { total, rows } = await Produit.searchProduits({
      search,
      limit,
      offset,
      sortBy,
      order,
    });

    // Modifier chaque imageUrl
    // const fullUrl = `${req.protocol}://${req.get("host")}`;
    const fullUrl = process.env.BASE_URL;

    const data = rows.map((produit) => ({
      ...produit,
      imageUrl: produit.imageUrl
        ? `${fullUrl}${produit.imageUrl}`
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
    console.error("Erreur recherche dynamique:", err);
    res.status(500).json({ message: "Erreur serveur lors de la recherche." });
  }
};


module.exports = {
  getProduits,
  getProduitById,
  createProduit,
  updateProduit,
  deleteProduit,
  getProductByDynamicSearch,
};
