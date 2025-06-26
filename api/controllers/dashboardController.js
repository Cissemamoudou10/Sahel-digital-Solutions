const db = require("../configs/db"); // Assure-toi que c'est bien configuré

const getDashboardStats = async (req, res) => {
  try {
    const [
      [produitCount],
      [totalStock],
      [totalUsers],
      [adminCount],
      [realisationCount],
      [realisationParCategorie],
      [valeurTotaleStock],
    ] = await Promise.all([
      db.query("SELECT COUNT(*) AS count FROM produits"),
      db.query("SELECT SUM(stock) AS totalStock FROM produits"),
      db.query("SELECT COUNT(*) AS count FROM utilisateurs"),
      db.query("SELECT COUNT(*) AS count FROM utilisateurs WHERE role = 'admin'"),
      db.query("SELECT COUNT(*) AS count FROM realisations"),
      db.query(`SELECT categorie, COUNT(*) AS count FROM realisations GROUP BY categorie`),
      db.query("SELECT SUM(prix * stock) AS total FROM produits"),
    ]);

    res.json({
      produits: produitCount[0].count,
      stock_total: totalStock[0].totalStock || 0,
      utilisateurs: totalUsers[0].count,
      admins: adminCount[0].count,
      realisations: realisationCount[0].count,
      realisations_par_categorie: realisationParCategorie.map((row) => ({
        categorie: row.categorie,
        count: row.count,
      })),
      valeur_stock_totale: valeurTotaleStock[0].total || 0,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération du dashboard :", error);
    res.status(500).json({ message: "Erreur serveur lors du chargement du dashboard" });
  }
};

module.exports = {
  getDashboardStats,
};
