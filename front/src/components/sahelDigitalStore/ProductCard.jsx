import React from "react";
import { Eye } from "lucide-react"; // Icône moderne

const ProductCard = ({ produit, onVoirDetails }) => (
  <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col group cursor-pointer">
    <div className="relative w-full h-48 overflow-hidden rounded-xl mb-4">
      <img
        src={produit.imageUrl}
        alt={produit.nom}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>

    <h3 className="font-semibold text-lg text-[#1B1B1B] mb-1 truncate">{produit.nom}</h3>
    <p className="text-[#FD4D01] font-extrabold text-xl mb-3">{produit.prix}</p>

    <button
      onClick={() => onVoirDetails(produit)}
      className="mt-auto inline-flex items-center justify-center gap-2 bg-[#034C52] text-white font-medium py-2 px-4 rounded-lg hover:bg-[#022F33] transition-colors"
    >
      <Eye size={18} />
      Voir détails
    </button>
  </div>
);

export default ProductCard;
