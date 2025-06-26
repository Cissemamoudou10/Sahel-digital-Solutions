import React from "react";
import { FaSearch } from "react-icons/fa";

const ProductFilter = ({
  categories,
  categorieActive,
  onCategorieChange,
  recherche,
  onRechercheChange,
}) => (
  <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
    {/* Barre de recherche */}
    <div className="relative w-full md:w-1/2">
      <FaSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Rechercher un produit..."
        value={recherche}
        onChange={(e) => onRechercheChange(e.target.value)}
        className="w-full pl-12 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FD4D01] focus:outline-none transition-all duration-300 text-[#1B1B1B] bg-white shadow-sm"
      />
    </div>

    {/* Filtres par catégorie */}
    <div className="flex flex-wrap justify-center md:justify-end gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`px-4 py-1.5 rounded-full border text-sm font-medium transition-all duration-200 ${
            cat === categorieActive
              ? "bg-[#FD4D01] text-white border-transparent shadow-sm"
              : "bg-white text-[#034C52] border-[#034C52] hover:bg-[#034C52] hover:text-white"
          }`}
          onClick={() => onCategorieChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  </div>
);

export default ProductFilter;
