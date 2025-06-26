// src/pages/NotFound.jsx
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F4F8F8] text-center px-4">
      <h1 className="text-6xl font-bold text-[#FD4D01] mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-6">Page introuvable.</p>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-white bg-[#034C52] px-4 py-2 rounded hover:bg-[#026067] transition"
      >
        <FaArrowLeft /> Retour en arrière
      </button>
    </div>
  );
};

export default NotFound;
