import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import {
  FaFacebookF,
  FaWhatsapp,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#034C52] text-white pt-12 pb-6 px-6 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo + Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1 }}
        >
          <img src={assets.logoSDGreen} alt="Logo" className="h-16 mb-4" />
          <p className="text-sm leading-relaxed">
            Sahel Digital Solutions est une entreprise spécialisée dans la vente
            de matériel informatique, la communication visuelle et le
            développement numérique.
          </p>
        </motion.div>

        {/* Liens rapides */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <h3 className="text-lg font-semibold mb-4">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-[#FD4D01] transition">
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/store" className="hover:text-[#FD4D01] transition">
                Sahel Digital Store
              </Link>
            </li>
            <li>
              <Link to="/visual" className="hover:text-[#FD4D01] transition">
                Sahel Visual
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-[#FD4D01] transition">
                Services
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* Nos branches */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <h3 className="text-lg font-semibold mb-4">Nos branches</h3>
          <ul className="space-y-2 text-sm">
            <li>Sahel Digital Store</li>
            <li>Sahel Visual</li>
            <li>Service & Conseil</li>
          </ul>
        </motion.div>

        {/* Contact + Réseaux sociaux */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <p className="text-sm mb-2">📧 contact@saheldigital.ml</p>
          <p className="text-sm mb-2">📞 +223 70 00 00 00</p>
          <p className="text-sm mb-4">📍 Bamako, Mali</p>
          <div className="flex gap-4 text-white text-lg">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FD4D01]"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://wa.me/22370000000"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FD4D01]"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FD4D01]"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FD4D01]"
            >
              <FaInstagram />
            </a>
          </div>
        </motion.div>
      </div>

      <hr className="my-6 border-gray-600" />
      <p className="text-center text-xs text-gray-300">
        © {new Date().getFullYear()} Sahel Digital Solutions. Tous droits
        réservés.
      </p>
    </footer>
  );
};

export default Footer;
