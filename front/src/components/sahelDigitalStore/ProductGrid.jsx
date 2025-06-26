import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({ produits, onVoirDetails }) => {
  return (
    <div className="mt-12 px-4 sm:px-6 lg:px-10">
      {produits.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {produits.map((produit) => (
            <ProductCard
              key={produit.id}
              produit={produit}
              onVoirDetails={onVoirDetails}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-[#4A4A4A] py-16">
          <h3 className="text-xl font-semibold mb-2">Aucun produit trouvé</h3>
          <p className="text-sm">Essayez de modifier les filtres ou votre recherche.</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
