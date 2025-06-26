const db = require("../configs/db");

const Realisation = {
  getAll: async () => {
    const [rows] = await db.query(
      "SELECT * FROM realisations ORDER BY created_at DESC"
    );
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query(
      "SELECT * FROM realisations WHERE id = ?",
      [id]
    );
    return rows[0];
  },

  create: async ({ titre, categorie, description, imageUrl }) => {
    const [result] = await db.query(
      "INSERT INTO realisations (titre, categorie, description, imageUrl) VALUES (?, ?, ?, ?)",
      [titre, categorie, description, imageUrl]
    );
    return { id: result.insertId };
  },

  update: async (id, { titre, categorie, description, imageUrl }) => {
    const [result] = await db.query(
      "UPDATE realisations SET titre = ?, categorie = ?, description = ?, imageUrl = ? WHERE id = ?",
      [titre, categorie, description, imageUrl, id]
    );
    return result;
  },

  remove: async (id) => {
    const [result] = await db.query(
      "DELETE FROM realisations WHERE id = ?",
      [id]
    );
    return result;
  },

  searchRealisations: async ({ search, limit, offset, sortBy, order }) => {
    const keywords = search.trim().toLowerCase().split(/\s+/);
    const whereClauses = [];
    const values = [];

    keywords.forEach((word) => {
      whereClauses.push(`(LOWER(titre) LIKE ? OR LOWER(categorie) LIKE ? OR LOWER(description) LIKE ?)`);
      values.push(`%${word}%`, `%${word}%`, `%${word}%`);
    });

    const whereClause = whereClauses.length
      ? `WHERE ${whereClauses.join(" AND ")}`
      : "";

    // total
    const [countRows] = await db.query(
      `SELECT COUNT(*) AS total FROM realisations ${whereClause}`,
      values
    );
    const total = countRows[0].total;

    // data
    const [rows] = await db.query(
      `SELECT * FROM realisations ${whereClause}
       ORDER BY ${sortBy} ${order}
       LIMIT ? OFFSET ?`,
      [...values, limit, offset]
    );

    return { total, rows };
  },
};

module.exports = Realisation;
