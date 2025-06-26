const db = require("../configs/db"); // doit être un pool avec mysql2/promise

const User = {
  getAll: async () => {
    const [rows] = await db.query("SELECT id, pseudo, role FROM utilisateurs");
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query(
      "SELECT id, pseudo, role FROM utilisateurs WHERE id = ?",
      [id]
    );
    return rows[0]; // retourne un seul utilisateur
  },

  create: async ({ pseudo, hash, role }) => {
    const [result] = await db.query(
      "INSERT INTO utilisateurs (pseudo, mot_de_passe, role) VALUES (?, ?, ?)",
      [pseudo, hash, role]
    );
    return result;
  },

  update: async (id, { pseudo, hash, role }) => {
    const fields = [];
    const values = [];

    if (pseudo) {
      fields.push("pseudo = ?");
      values.push(pseudo);
    }
    if (hash) {
      fields.push("mot_de_passe = ?");
      values.push(hash);
    }
    if (role) {
      fields.push("role = ?");
      values.push(role);
    }

    if (fields.length === 0) return;

    const query = `UPDATE utilisateurs SET ${fields.join(", ")} WHERE id = ?`;
    values.push(id);

    const [result] = await db.query(query, values);
    return result;
  },

  delete: async (id) => {
    const [result] = await db.query("DELETE FROM utilisateurs WHERE id = ?", [
      id,
    ]);
    return result;
  },


  getByPseudo: async (pseudo) => {
    const [rows] = await db.query(
      "SELECT id FROM utilisateurs WHERE pseudo = ?",
      [pseudo]
    );
    return rows[0]; // null ou l'utilisateur
  },

  
  searchUsers: async ({
    search = "",
    limit = 10,
    offset = 0,
    sortBy = "pseudo",
    order = "ASC",
  }) => {
    const keywords = search.trim().toLowerCase().split(/\s+/);
    const whereClauses = [];
    const values = [];

    keywords.forEach((word) => {
      whereClauses.push(`(LOWER(pseudo) LIKE ? OR LOWER(role) LIKE ?)`);
      values.push(`%${word}%`, `%${word}%`);
    });

    const whereClause = whereClauses.length
      ? `WHERE ${whereClauses.join(" AND ")}`
      : "";

    // Total count
    const [countRows] = await db.query(
      `SELECT COUNT(*) AS total FROM utilisateurs ${whereClause}`,
      values
    );
    const total = countRows[0].total;

    // Data with pagination and sorting
    const [rows] = await db.query(
      `SELECT id, pseudo, role FROM utilisateurs ${whereClause}
       ORDER BY ${sortBy} ${order}
       LIMIT ? OFFSET ?`,
      [...values, limit, offset]
    );

    return { total, rows };
  },
};

module.exports = User;
