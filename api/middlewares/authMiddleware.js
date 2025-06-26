const jwt = require('jsonwebtoken');

const verifierToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Token manquant.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "votre_clé_secrète");
    req.utilisateur = decoded;
    next();
  } catch {
    res.status(403).json({ error: 'Token invalide.' });
  }
};

module.exports = verifierToken;
