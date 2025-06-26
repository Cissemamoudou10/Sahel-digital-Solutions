import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiCamera } from "react-icons/fi";
import { useError } from "../../errorContext/ErrorContext";
import axiosClient from "../../utils/axiosClient";

const AjouterRealisation = () => {
  const navigate = useNavigate();
  const { showError } = useError();

  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    titre: "",
    description: "",
    categorie: "Sahel Visual",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("titre", form.titre);
    formData.append("categorie", form.categorie);
    formData.append("description", form.description);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await axiosClient.post("/realisations", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/adminPanel/realisations/liste");
    } catch (error) {
      const msg = error.response?.data?.message || "Erreur lors de l'ajout";
      showError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow text-[#1B1B1B]">
      <h1 className="text-2xl font-bold mb-6 text-[#034C52]">
        Ajouter une réalisation
      </h1>

      {/* Image Preview */}
      <div className="relative w-48 h-48 mb-6 rounded overflow-hidden border border-[#D9E1E2] bg-[#F4F8F8] flex items-center justify-center">
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Aperçu"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-[#034C52] text-lg">Aucune image</div>
        )}
        <label className="absolute inset-0 bg-black bg-opacity-30 hover:bg-opacity-50 transition flex items-center justify-center cursor-pointer">
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
            className="w-full border border-[#D9E1E2] px-3 py-2 rounded"
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
            className="w-full border border-[#D9E1E2] px-3 py-2 rounded"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 bg-[#034C52] text-white rounded hover:bg-[#026066] transition ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Ajout en cours..." : "Ajouter"}
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

export default AjouterRealisation;
