import { useNavigate, useLoaderData } from "react-router-dom";

const ProduitDetails = () => {
  const navigate = useNavigate();
  const produit = useLoaderData();
  const baseUrl = import.meta.env.VITE_API_URL;
  const getInitials = (name) => {
    if (!name || typeof name !== "string") return "?";
    const trimmed = name.trim();
    if (trimmed.length === 0) return "?";
    return trimmed.charAt(0).toUpperCase();
  };

  if (!produit) {
    return <div className="p-6 text-[#FD4D01]">Produit non trouvé.</div>;
  }

  return (
    <div className="p-6 bg-[#FFFFFF] rounded-xl shadow-md max-w-xl mx-auto border border-[#D9E1E2]">
      <h1 className="text-2xl font-bold text-[#034C52] mb-6">
        Détails du produit
      </h1>

      <div className="flex justify-center mb-6">
        {produit.imageUrl ? (
          <img
          src={produit.imageUrl}
            alt={produit.nom}
            className="w-48 h-48 object-cover rounded-xl border border-[#D9E1E2]"
          />
        ) : (
          <div className="w-48 h-48 flex items-center justify-center bg-[#034C52] text-white text-4xl font-bold rounded-xl border border-[#D9E1E2]">
            {getInitials(produit.nom)}
          </div>
        )}
      </div>

      <div className="space-y-3 text-[#1B1B1B]">
        <p>
          <span className="font-semibold text-[#4A4A4A]">Nom :</span>{" "}
          {produit.nom}
        </p>
        <p>
          <span className="font-semibold text-[#4A4A4A]">Catégorie :</span>{" "}
          {produit.categorie}
        </p>
        <p>
          <span className="font-semibold text-[#4A4A4A]">Prix :</span>{" "}
          {produit.prix.toLocaleString()} FCFA
        </p>
        <p>
          <span className="font-semibold text-[#4A4A4A]">Stock :</span>{" "}
          {produit.stock}
        </p>
        <p>
          <span className="font-semibold text-[#4A4A4A]">Description :</span>{" "}
          {produit.description ? (
            produit.description
          ) : (
            <span className="italic text-gray-400">Aucune description</span>
          )}
        </p>
      </div>

      <div className="mt-8 flex gap-4">
        <button
          onClick={() =>
            navigate(`/adminPanel/produits/modifier/${produit.id}`)
          }
          className="px-4 py-2 rounded-lg font-medium bg-[#FD4D01] text-white hover:opacity-90 transition"
        >
          Modifier
        </button>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-lg font-medium bg-[#F4F8F8] text-[#034C52] border border-[#D9E1E2] hover:bg-[#EDEDED] transition"
        >
          Retour
        </button>
      </div>
    </div>
  );
};

export default ProduitDetails;
