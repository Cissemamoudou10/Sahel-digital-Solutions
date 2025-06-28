const express = require("express");
const cors = require("cors");
const produitRoutes = require("./routes/produitRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const realisationRoutes = require("./routes/realisationRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

// const corsOptions = {
//   origin: process.env.FRONTEND_URL,
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true,
// };


const app = express();

// app.use(cors(corsOptions));
app.use(cors());

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use(process.env.ROUTE_AUTH, authRoutes);
app.use(process.env.ROUTE_PRODUITS, produitRoutes);
app.use(process.env.ROUTE_UTILISATEURS, userRoutes);
app.use(process.env.ROUTE_REALISATIONS, realisationRoutes);
app.use(process.env.ROUTE_DASHBOARD, dashboardRoutes);

module.exports = app;
