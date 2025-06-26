const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../configs/db"); // ton fichier MySQL pool/connexion

const login = async (req, res) => {
  console.log(req);
  const { pseudo, mot_de_passe } = req.body;

  try {
    const [rows] = await db.query(
      "SELECT * FROM utilisateurs WHERE pseudo = ?",
      [pseudo]
    );

    if (rows.length === 0) {
      console.log("Utilisateur introuvable");
      return res
        .status(404)
        .json({ error: "Pseudo ou mot de passe incorrect." });
    }

    const utilisateur = rows[0];

    const match = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe);
    if (!match) {
      return res
        .status(401)
        .json({ error: "Pseudo ou mot de passe incorrect." });
    }

    const token = jwt.sign(
      {
        id: utilisateur.id,
        pseudo: utilisateur.pseudo,
        role: utilisateur.role,
      },
      process.env.JWT_SECRET || "votre_clé_secrète",
      { expiresIn: "30m" } // <-- expiration à 2 minutes
    );
    

    res.json({
      message: "Connexion réussie",
      token,
      user: {
        pseudo: utilisateur.pseudo,
        role: utilisateur.role,
      },
    });
    console.log("Utilisateur connecté avec succès!");
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la connexion." });
    console.log("Erreur de connexion!");
  }
};

const logout = (req, res) => {
  // Ici on ne gère pas encore de session sur le serveur.
  // Donc côté client, on supprime le token du localStorage/cookies.
  res.status(200).json({ message: "Déconnecté avec succès." });
};

module.exports = { login, logout };
