const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur ${process.env.BASE_URL}:${PORT}`);
});
