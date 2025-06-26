const db = require("../configs/db");

const Produit = {
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM produits ORDER BY created_at DESC");
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query("SELECT * FROM produits WHERE id = ?", [id]);
    return rows[0];
  },

  create: async ({ nom, categorie, prix, stock, description, imageUrl }) => {
    const [result] = await db.query(
      "INSERT INTO produits (nom, categorie, prix, stock, description, imageUrl) VALUES (?, ?, ?, ?, ?, ?)",
      [nom, categorie, prix, stock, description, imageUrl]
    );
    return { id: result.insertId };
  },

  update: async (id, { nom, categorie, prix, stock, description, imageUrl }) => {
    const [result] = await db.query(
      "UPDATE produits SET nom = ?, categorie = ?, prix = ?, stock = ?, description = ?, imageUrl = ? WHERE id = ?",
      [nom, categorie, prix, stock, description, imageUrl, id]
    );
    return result;
  },

  remove: async (id) => {
    const [result] = await db.query("DELETE FROM produits WHERE id = ?", [id]);
    return result;
  },

  searchProduits: async ({ search, limit, offset, sortBy, order }) => {
    const keywords = search.trim().toLowerCase().split(/\s+/);
    const whereClauses = [];
    const values = [];

    keywords.forEach((word) => {
      whereClauses.push(`(LOWER(nom) LIKE ? OR LOWER(categorie) LIKE ? OR LOWER(description) LIKE ?)`);
      values.push(`%${word}%`, `%${word}%`, `%${word}%`);
    });

    const whereClause = whereClauses.length ? `WHERE ${whereClauses.join(" AND ")}` : "";

    // total
    const [countRows] = await db.query(
      `SELECT COUNT(*) AS total FROM produits ${whereClause}`,
      values
    );
    const total = countRows[0].total;

    // data
    const [rows] = await db.query(
      `SELECT * FROM produits ${whereClause}
       ORDER BY ${sortBy} ${order}
       LIMIT ? OFFSET ?`,
      [...values, limit, offset]
    );

    return { total, rows };
  }
};

module.exports = Produit;
