import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { useError } from "../../errorContext/ErrorContext";
import axiosClient from "../../utils/axiosClient";

const AjouterUtilisateur = () => {
  const navigate = useNavigate();
  const { showError } = useError();
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    pseudo: "",
    mot_de_passe: "",
    role: "user",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axiosClient.post("/utilisateurs", form);

      navigate("/adminPanel/utilisateurs/liste");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Erreur lors de l'ajout de l'utilisateur";
      console.error("Erreur:", message);
      showError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow text-[#1B1B1B] max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-[#034C52]">
        Ajouter un utilisateur
      </h1>

      {/* Avatar ou icône utilisateur */}
      <div className="relative w-32 h-32 mb-6 rounded-full overflow-hidden border border-[#D9E1E2] bg-[#F4F8F8] flex items-center justify-center mx-auto">
        <FiUser className="text-[#034C52] text-5xl" />
      </div>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#4A4A4A]">Pseudo</label>
          <input
            type="text"
            name="pseudo"
            value={form.pseudo}
            onChange={handleChange}
            required
            className="w-full border border-[#D9E1E2] px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#4A4A4A]">Mot de passe</label>
          <input
            type="password"
            name="mot_de_passe"
            value={form.mot_de_passe}
            onChange={handleChange}
            required
            className="w-full border border-[#D9E1E2] px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#4A4A4A]">Rôle</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border border-[#D9E1E2] px-3 py-2 rounded"
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 bg-[#034C52] text-white rounded hover:bg-[#026066] transition flex items-center justify-center gap-2 ${
              isLoading ? "cursor-not-allowed opacity-70" : ""
            }`}
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : (
              <>
                <FaUserPlus />
                Ajouter
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-[#FD4D01] text-white rounded hover:bg-[#e44300] transition"
            disabled={isLoading}
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default AjouterUtilisateur;
