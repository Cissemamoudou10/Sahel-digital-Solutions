const mysql = require("mysql2/promise");
require("dotenv").config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Vérifie la connexion au lancement
(async () => {
  try {
    const connection = await db.getConnection();
    console.log("✅ Connexion à la base de données MySQL réussie sans probleme!");
    connection.release();
  } catch (error) {
    console.error("❌ Échec de la connexion à la base de données :", error.message);
  }
})();

module.exports = db;
