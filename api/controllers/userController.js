const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

// GET /api/utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const rows = await User.getAll();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/utilisateurs/:id
exports.getUserById = async (req, res) => {
  try {
    const user = await User.getById(req.params.id);
    res.json(user || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/utilisateurs
exports.createUser = async (req, res) => {
  try {
    const { pseudo, mot_de_passe, role = "user" } = req.body;

    // Vérifie si le pseudo existe déjà
    const existingUser = await User.getByPseudo(pseudo);
    if (existingUser) {
      return res.status(400).json({ error: "Ce pseudo est déjà utilisé." });
    }

    // Hasher le mot de passe
    const hash = await bcrypt.hash(mot_de_passe, 10);

    // Création
    const result = await User.create({ pseudo, hash, role });

    res.status(201).json({ message: "Utilisateur créé", id: result.insertId });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// PUT /api/utilisateurs/:id
exports.updateUser = async (req, res) => {
  try {
    const { pseudo, mot_de_passe, role } = req.body;
    const hash = mot_de_passe?.trim()
      ? await bcrypt.hash(mot_de_passe, 10)
      : undefined;

    await User.update(req.params.id, { pseudo, hash, role });
    res.json({ message: "Utilisateur mis à jour" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// DELETE /api/utilisateurs/:id
exports.deleteUser = async (req, res) => {
  try {
    await User.delete(req.params.id);
    res.json({ message: "Utilisateur supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.searchUsers = async (req, res) => {
  try {
    const {
      search = "",
      limit = 10,
      offset = 0,
      sortBy = "pseudo",
      order = "ASC",
    } = req.query;

    const result = await User.searchUsers({
      search,
      limit: parseInt(limit),
      offset: parseInt(offset),
      sortBy,
      order: order.toUpperCase() === "DESC" ? "DESC" : "ASC",
    });

    res.json({ data: result['rows'], total: result['total'] });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
