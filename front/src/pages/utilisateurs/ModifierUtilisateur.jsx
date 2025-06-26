import { useNavigate, useLoaderData } from "react-router-dom";
import { useState } from "react";
import { useError } from "../../errorContext/ErrorContext";
import axiosClient from "../../utils/axiosClient";

const ModifierUtilisateur = () => {
  const navigate = useNavigate();
  const utilisateur = useLoaderData();
  const [loading, setLoading] = useState(false);
  const { showError } = useError();

  const [form, setForm] = useState({
    pseudo: utilisateur?.pseudo || "",
    role: utilisateur?.role || "",
    mot_de_passe: "",
  });

  if (!utilisateur) {
    return <div className="p-6 text-red-500">Utilisateur non trouvé.</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosClient.put(`/utilisateurs/${utilisateur.id}`, {
        pseudo: form.pseudo,
        role: form.role,
        ...(form.mot_de_passe ? { mot_de_passe: form.mot_de_passe } : {}), // On n'envoie le mot de passe que s'il a été rempli
      });

      console.log("Utilisateur modifié :", res.data);
      navigate(-1);
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      const message =
        error.response?.data?.message ||
        "Erreur lors de la modification de l'utilisateur";
      showError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow text-[#1B1B1B]">
      <h1 className="text-2xl font-bold mb-6 text-[#034C52]">
        Modifier l'utilisateur
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#4A4A4A]">
            Pseudo
          </label>
          <input
            type="text"
            name="pseudo"
            value={form.pseudo}
            onChange={handleChange}
            className="w-full border border-[#D9E1E2] px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#4A4A4A]">
            Rôle
          </label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border border-[#D9E1E2] px-3 py-2 rounded"
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
            {/* Ajoute d'autres rôles selon ton système */}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#4A4A4A]">
            Nouveau mot de passe
          </label>
          <input
            type="password"
            name="mot_de_passe"
            value={form.mot_de_passe}
            onChange={handleChange}
            className="w-full border border-[#D9E1E2] px-3 py-2 rounded"
            placeholder="Laisser vide pour ne pas changer"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-[#034C52] text-white rounded hover:bg-[#026066] transition flex items-center justify-center gap-2 min-w-[130px]"
          >
            {loading ? (
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
              "Enregistrer"
            )}
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-[#FD4D01] text-white rounded hover:bg-[#e44300] transition"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModifierUtilisateur;
