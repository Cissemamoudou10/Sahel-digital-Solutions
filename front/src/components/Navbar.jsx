import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { Home, Store, Image, Layers, ShieldUser } from "lucide-react"; // Icônes importées

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showMobileMenu ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showMobileMenu]);

  const navLinks = [
    { label: "Accueil", path: "/", icon: <Home className="w-4 h-4 mr-2" /> },
    {
      label: "Sahel Digital Store",
      path: "/store",
      icon: <Store className="w-4 h-4 mr-2" />,
    },
    {
      label: "Sahel Visual",
      path: "/visual",
      icon: <Image className="w-4 h-4 mr-2" />,
    },
    {
      label: "Services",
      path: "/services",
      icon: <Layers className="w-4 h-4 mr-2" />,
    },
    // {
    //   label: "Admin",
    //   path: "/adminPanel/dashboard",
    //   icon: <ShieldUser className="w-4 h-4 mr-2" />,
    // },
  ];

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.1, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 bg-[#034C52] text-white shadow-md"
    >
      <div className="container mx-auto flex justify-between items-center py-3 px-4 sm:px-6 md:px-8 lg:px-12 flex-nowrap gap-4">
        <motion.img
          src={assets.logoSDGreen}
          alt="Logo Sahel Digital"
          className="h-10 sm:h-12 md:h-14 lg:h-16 flex-shrink-0"
          whileHover={{ scale: 1 }}
        />

        <ul className="hidden md:flex flex-shrink min-w-0 flex-wrap gap-3 md:gap-5 lg:gap-7 xl:gap-8 text-sm md:text-[15px] lg:text-base font-medium overflow-hidden">
          {navLinks.map((link, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
              whileHover={{ scale: 1 }}
              className="flex items-center"
            >
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-1 sm:gap-2 transition-colors hover:text-[#FD4D01] ${
                    isActive ? "text-[#FD4D01]" : ""
                  }`
                }
              >
                <span className="text-base md:text-lg lg:text-xl">
                  {link.icon}
                </span>
                <span className="whitespace-nowrap truncate">{link.label}</span>
              </NavLink>
            </motion.li>
          ))}
        </ul>

        <motion.div
          className="hidden md:block flex-shrink-0"
          whileHover={{ scale: 1 }}
          whileTap={{ scale: 0.95 }}
        >
          <NavLink
            to="/contact"
            className="bg-[#FD4D01] text-white px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 lg:py-2.5 rounded-full text-xs sm:text-sm lg:text-base whitespace-nowrap"
          >
            Nous contacter
          </NavLink>
        </motion.div>

        <img
          src={assets.menu_icon}
          alt="Menu"
          className="md:hidden w-6 sm:w-7 cursor-pointer"
          onClick={() => setShowMobileMenu(true)}
        />
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.05 }}
            className="fixed inset-0 bg-white text-[#034C52] z-50"
          >
            <div className="flex justify-between items-center p-6">
              <img
                src={assets.logoSDWhite}
                alt="Logo Sahel Digital"
                className="w-32 h-auto"
              />
              <img
                src={assets.cross_icon}
                alt="Fermer"
                className="w-6 h-6 cursor-pointer"
                onClick={() => setShowMobileMenu(false)}
              />
            </div>

            <ul className="flex flex-col items-center gap-6 mt-10 text-lg font-semibold">
              {navLinks.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <NavLink
                    to={link.path}
                    onClick={() => setShowMobileMenu(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-2 hover:text-[#FD4D01] transition ${
                        isActive ? "text-[#FD4D01]" : ""
                      }`
                    }
                  >
                    {link.icon}
                    {link.label}
                  </NavLink>
                </motion.li>
              ))}
              <motion.li
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <NavLink
                  to="/contact"
                  onClick={() => setShowMobileMenu(false)}
                  className="bg-[#FD4D01] text-white px-5 py-2 rounded-full hover:bg-[#034C52] hover:text-white transition"
                >
                  Nous contacter
                </NavLink>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
