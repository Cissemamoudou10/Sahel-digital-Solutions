// src/App.jsx
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./layout/Layout";
import Home from "./pages/Home";
import SahelDigitalStore from "./pages/SahelDigitalStore";
import SahelVisual from "./pages/SahelVisual";
import ServicesPage from "./pages/ServicePage";
import AdminLayout from "./pages/admin/AdminLayout";
import ListeProduits from "./pages/produits/ListeProduits";
import ProduitDetails from "./pages/produits/ProduitDetails";
import ModifierProduit from "./pages/produits/ModifierProduit";
import AjouterProduit from "./pages/produits/AjouterProduit";
import Dashboard from "./pages/admin/Dashboard";
import Login from "./pages/Login";
import NotFound from "./components/NotFound";
import PrivateRoute from "./utils/PrivateRoute";
import { produitLoader } from "./loaders/produitLoader";
import ErrorPage from "./components/ErrorPage";
import ListeUtilisateurs from "./pages/utilisateurs/ListeUtilisateurs";
import UtilisateurDetails from "./pages/utilisateurs/UtilisateurDetails";
import ModifierUtilisateur from "./pages/utilisateurs/ModifierUtilisateur";
import { utilisateurLoader } from "./loaders/utilisateurLoader";
import AjouterUtilisateur from "./pages/utilisateurs/AjouterUtilisateur";
import ListeRealisations from "./pages/realisations/ListeRealisations";
import AjouterRealisation from "./pages/realisations/AjouterRealisation";
import RealisationDetails from "./pages/realisations/RealisationDetails";
import ModifierRealisation from "./pages/realisations/ModifierRealisation";
import { realisationLoader } from "./loaders/realisationLoader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "store", element: <SahelDigitalStore /> },
      { path: "visual", element: <SahelVisual /> },
      { path: "services", element: <ServicesPage /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/adminPanel",
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <AdminLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, path: "dashboard", element: <Dashboard /> },

      // Produits
      { path: "produits/liste", element: <ListeProduits /> },
      { path: "produits/ajouter", element: <AjouterProduit /> },
      {
        path: "produits/:id",
        element: <ProduitDetails />,
        loader: produitLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: "produits/modifier/:id",
        element: <ModifierProduit />,
        loader: produitLoader,
        errorElement: <ErrorPage />,
      },

      // Utilisateurs
      { path: "utilisateurs/liste", element: <ListeUtilisateurs /> },
      { path: "utilisateurs/ajouter", element: <AjouterUtilisateur /> },
      {
        path: "utilisateurs/:id",
        element: <UtilisateurDetails />,
        loader: utilisateurLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: "utilisateurs/modifier/:id",
        element: <ModifierUtilisateur />,
        loader: utilisateurLoader,
        errorElement: <ErrorPage />,
      },

      // Realisations
      { path: "realisations/liste", element: <ListeRealisations /> },
      { path: "realisations/ajouter", element: <AjouterRealisation /> },
      {
        path: "realisations/:id",
        element: <RealisationDetails />,
        loader: realisationLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: "realisations/modifier/:id",
        element: <ModifierRealisation />,
        loader: realisationLoader,
        errorElement: <ErrorPage />,
      },
    ],
  },

  { path: "*", element: <NotFound /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
