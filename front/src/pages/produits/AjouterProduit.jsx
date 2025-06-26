import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiCamera } from "react-icons/fi";
import { FaBoxOpen } from "react-icons/fa";
import { useError } from "../../errorContext/ErrorContext"
import axiosClient from "../../utils/axiosClient";

const AjouterProduit = () => {
  const navigate = useNavigate();
  const { showError } = useError();

  const [imagePreview, setImagePreview] = useState("");
  const [newImageFile, setNewImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    nom: "",
    categorie: "",
    prix: 0,
    stock: 0,
    description: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "prix" || name === "stock" ? parseInt(value) : value,
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
    setIsLoading(true);
  
    const formData = new FormData();
    formData.append("nom", form.nom);
    formData.append("categorie", form.categorie);
    formData.append("prix", form.prix);
    formData.append("stock", form.stock);
    formData.append("description", form.description);
    if (newImageFile) {
      formData.append("image", newImageFile);
    }
  
    try {
      const res = await axiosClient.post("/produits", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // IMPORTANT : sinon l'upload échoue
        },
      });
  
      navigate("/adminPanel/produits/liste");
    } catch (error) {
      const message =
        error.response?.data?.message || "Erreur lors de l'ajout du produit";
      console.error("Erreur:", message);
      showError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow text-[#1B1B1B]">
      <h1 className="text-2xl font-bold mb-6 text-[#034C52]">Ajouter un produit</h1>

      {/* Image */}
      <div className="relative w-48 h-48 mb-6 rounded overflow-hidden border border-[#D9E1E2] bg-[#F4F8F8] flex items-center justify-center">
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Aperçu"
            className="w-full h-full object-cover"
          />
        ) : (
          <FaBoxOpen className="text-[#034C52] text-6xl" />
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
          <label className="block text-sm font-medium text-[#4A4A4A]">Nom</label>
          <input
            type="text"
            name="nom"
            value={form.nom}
            onChange={handleChange}
            required
            className="w-full border border-[#D9E1E2] px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#4A4A4A]">Catégorie</label>
          <input
            type="text"
            name="categorie"
            value={form.categorie}
            onChange={handleChange}
            required
            className="w-full border border-[#D9E1E2] px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#4A4A4A]">Prix</label>
          <input
            type="number"
            name="prix"
            value={form.prix}
            onChange={handleChange}
            required
            className="w-full border border-[#D9E1E2] px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#4A4A4A]">Stock</label>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            required
            className="w-full border border-[#D9E1E2] px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#4A4A4A]">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full border border-[#D9E1E2] px-3 py-2 rounded"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 bg-[#034C52] text-white rounded hover:bg-[#026066] transition flex items-center justify-center gap-2 ${isLoading ? "cursor-not-allowed opacity-70" : ""}`}
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
              "Ajouter"
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

export default AjouterProduit;
