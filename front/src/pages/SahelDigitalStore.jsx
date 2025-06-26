import React, { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient"; // baseURL configuré
import SectionHeader from "../components/sahelDigitalStore/SectionHeader";
import ProductFilter from "../components/sahelDigitalStore/ProductFilter";
import ProductGrid from "../components/sahelDigitalStore/ProductGrid";
import ProductModal from "../components/sahelDigitalStore/ProductModal";

const categories = ["Tous", "Machines", "Consommables", "Accessoires"];
const produitsParPage = 8;

const SahelDigitalStore = () => {
  const [produits, setProduits] = useState([]);
  const [search, setSearch] = useState("");
  const [categorieActive, setCategorieActive] = useState("Tous");
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [produitSelectionne, setProduitSelectionne] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get("/produits/search", {
        params: {
          search,
          page,
          limit: produitsParPage,
          sortBy: "id",
          order: "DESC",
        },
      });
      const items = res.data.data.map((p) => ({
        ...p,
        image: `${axiosClient.defaults.baseURL}${p.imageUrl}`,
      }));
      setProduits(items);
      setTotalItems(res.data.total);
    } catch (err) {
      console.error("Erreur fetch produits:", err);
      setError("Impossible de charger les produits.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, page]);

  const produitsFiltres = produits.filter((p) => {
    return (
      (categorieActive === "Tous" || p.categorie === categorieActive) &&
      p.nom.toLowerCase().includes(search.toLowerCase())
    );
  });

  const totalPages = Math.ceil(totalItems / produitsParPage);

  return (
    <section className="bg-[#F4F8F8] py-16 px-6 md:px-20">
      <SectionHeader />

      <ProductFilter
        categories={categories}
        categorieActive={categorieActive}
        onCategorieChange={(cat) => {
          setCategorieActive(cat);
          setPage(1);
        }}
        recherche={search}
        onRechercheChange={(text) => {
          setSearch(text);
          setPage(1);
        }}
      />

      {loading ? (
        <p className="mt-10 text-center text-[#4A4A4A]">Chargement produits…</p>
      ) : error ? (
        <p className="mt-10 text-center text-red-500">{error}</p>
      ) : (
        <>
          <ProductGrid
            produits={produitsFiltres}
            onVoirDetails={setProduitSelectionne}
          />
          {produitSelectionne && (
            <ProductModal
              produit={produitSelectionne}
              onClose={() => setProduitSelectionne(null)}
            />
          )}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10 space-x-2">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2 border rounded bg-white hover:bg-gray-100 disabled:opacity-50"
              >
                Précédent
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-4 py-2 border rounded ${
                    page === i + 1
                      ? "bg-[#FD4D01] text-white"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="px-4 py-2 border rounded bg-white hover:bg-gray-100 disabled:opacity-50"
              >
                Suivant
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default SahelDigitalStore;

