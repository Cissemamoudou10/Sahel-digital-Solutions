import { useNavigate, useLoaderData } from "react-router-dom";
import { useState } from "react";
import { FiCamera } from "react-icons/fi";
import { useError } from "../../errorContext/ErrorContext";
import axiosClient from "../../utils/axiosClient";

const ModifierRealisation = () => {
  const navigate = useNavigate();
  const realisation = useLoaderData(); // On suppose qu'on a une réalisation préchargée
  const [imagePreview, setImagePreview] = useState(realisation?.imageUrl || "");
  const [newImageFile, setNewImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { showError } = useError();

  const [form, setForm] = useState({
    titre: realisation?.titre || "",
    categorie: realisation?.categorie || "",
    description: realisation?.description || "",
  });

  if (!realisation) {
    return <div className="p-6 text-red-500">Réalisation non trouvée.</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("titre", form.titre);
    formData.append("categorie", form.categorie);
    formData.append("description", form.description);

    if (newImageFile) {
      formData.append("image", newImageFile);
    }

    try {
      const res = await axiosClient.put(
        `/realisations/${realisation.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      navigate("/adminPanel/realisations/liste");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Erreur lors de la modification de la réalisation";
      console.error("Erreur:", message);
      showError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow text-[#1B1B1B]">
      <h1 className="text-2xl font-bold mb-6 text-[#034C52]">
        Modifier la réalisation
      </h1>

      {/* Image */}
      <div className="relative w-48 h-48 mb-6 rounded overflow-hidden border border-[#D9E1E2] bg-[#F4F8F8] flex items-center justify-center">
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Aperçu"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#034C52] text-white text-5xl font-bold">
            {form.titre.charAt(0).toUpperCase()}
          </div>
        )}
        <label className="absolute inset-0 bg-black bg-opacity-30 hover:bg-opacity-50 transition duration-200 flex items-center justify-center cursor-pointer">
          <FiCamera className="text-white text-2xl" />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#4A4A4A]">
            Titre
          </label>
          <input
            type="text"
            name="titre"
            value={form.titre}
            onChange={handleChange}
            required
            className="w-full border border-[#D9E1E2] px-3 py-2 rounded text-[#1B1B1B]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#4A4A4A]">
            Catégorie
          </label>
          <select
            name="categorie"
            value={form.categorie}
            onChange={handleChange}
            required
            className="w-full border border-[#D9E1E2] px-3 py-2 rounded bg-white"
          >
            <option value="Sahel Visual">Sahel Visual</option>
            <option value="Sahel Solutions">Sahel Solutions</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#4A4A4A]">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            required
            className="w-full border border-[#D9E1E2] px-3 py-2 rounded text-[#1B1B1B]"
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

export default ModifierRealisation;
