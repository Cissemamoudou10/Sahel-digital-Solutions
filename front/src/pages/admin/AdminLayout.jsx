import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaImages,
  FaFileInvoice,
  FaUsers,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { HiOutlineArrowLeft } from "react-icons/hi";
import useAuth from "../../authContext/useAuth";
import axiosClient from "../../utils/axiosClient";

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const getPageTitle = () => {
    if (location.pathname.includes("produits")) return " Produits";
    if (location.pathname.includes("realisations")) return " Réalisations";
    if (location.pathname.includes("factures")) return " Factures";
    if (location.pathname.includes("utilisateurs")) return " Utilisateurs";
    if (location.pathname.includes("dashboard")) return " Dashboard";
    return " Chemin inconnue!!!";
  };
  const handleLogout = async () => {
    try {
      await axiosClient.post("/auth/logout");
      logout();
      navigate("/login")
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#034C52] text-white flex flex-col">
        <div className="p-6 text-2xl font-bold text-center border-b border-white/20">
          Admin Panel
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavLink
            to="/adminPanel/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-md hover:bg-[#04686F] transition ${
                isActive ? "bg-[#04686F]" : ""
              }`
            }
          >
            <FaTachometerAlt /> Dashboard
          </NavLink>
          <NavLink
            to="/adminPanel/produits/liste"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-md hover:bg-[#04686F] transition ${
                isActive ? "bg-[#04686F]" : ""
              }`
            }
          >
            <FaBoxOpen /> Produits
          </NavLink>

          <NavLink
            to="/adminPanel/realisations/liste"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-md hover:bg-[#04686F] transition ${
                isActive ? "bg-[#04686F]" : ""
              }`
            }
          >
            <FaImages /> Réalisations
          </NavLink>

          {/* <NavLink
            to="/adminPanel/factures/liste"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-md hover:bg-[#04686F] transition ${
                isActive ? "bg-[#04686F]" : ""
              }`
            }
          >
            <FaFileInvoice /> Factures
          </NavLink> */}

          <NavLink
            to="/adminPanel/utilisateurs/liste"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-md hover:bg-[#04686F] transition ${
                isActive ? "bg-[#04686F]" : ""
              }`
            }
          >
            <FaUsers /> Utilisateurs
          </NavLink>
        </nav>

        <div className="p-4 border-t border-white/20">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm hover:text-orange-400 transition"
          >
            <FiLogOut /> Déconnexion
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-auto">
        {/* Header */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center border-b">
          <h1 className="text-xl font-semibold text-[#034C52]">
            Sahel Digital <span className="text-[#FD4D01]">Solutions</span>:{" "}
            {getPageTitle()}
          </h1>

          <div className="flex items-center gap-4">
            {/* Retour au site */}
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1 text-sm text-[#034C52] hover:underline"
            >
              <HiOutlineArrowLeft className="text-lg" />
              Retour au site
            </button>

            {/* Admin profile */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Admin</span>
              <div className="w-8 h-8 bg-[#FD4D01] rounded-full flex items-center justify-center text-white font-bold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
