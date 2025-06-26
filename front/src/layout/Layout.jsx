// src/layout/Layout.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../utils/ScrollToTop";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 mt-16">
        {" "}
        {/* Pour compenser la navbar fixed */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
