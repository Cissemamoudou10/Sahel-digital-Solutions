const isAdmin = (req, res, next) => {
  if (req.utilisateur && req.utilisateur.role === "admin") {
    next();
  } else {
    res.status(403).json({ error: "Accès réservé aux admins" });
  }
};

module.exports = isAdmin;
