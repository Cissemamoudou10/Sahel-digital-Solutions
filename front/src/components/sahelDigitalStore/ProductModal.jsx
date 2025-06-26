import React from "react";
import { XCircle, PhoneCall } from "lucide-react";

const ProductModal = ({ produit, onClose }) => {
  const isMobile = () => /Mobi|Android|iPhone/i.test(navigator.userAgent);

  if (!produit) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-6 md:p-8 pt-14 relative overflow-hidden">
        {/* Bouton de fermeture */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-[#FD4D01] transition"
            aria-label="Fermer"
          >
            <XCircle className="w-8 h-8" />
          </button>
        </div>

        {/* Contenu principal */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2">
            <img
              src={produit.imageUrl}
              alt={produit.nom}
              className="w-full h-60 md:h-64 object-cover rounded-xl"
            />
          </div>

          <div className="flex flex-col justify-between flex-1">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#034C52] mb-2">
                {produit.nom}
              </h2>
              <p className="text-[#FD4D01] font-bold text-xl md:text-2xl mb-4">
                {produit.prix}
              </p>
              <p className="text-[#4A4A4A] leading-relaxed text-sm md:text-base">
                {produit?.description ||
                  "Pas de description disponible pour ce produit."}
              </p>
            </div>

            {isMobile() ? (
              <a
                href="tel:+223XXXXXXXX"
                className="mt-6 inline-flex items-center justify-center gap-2 bg-[#034C52] text-white font-medium px-5 py-3 rounded-lg hover:bg-[#022F33] transition"
              >
                <PhoneCall className="w-5 h-5" />
                Appeler pour commander
              </a>
            ) : (
              <div className="mt-6 flex flex-col gap-2">
                <span className="text-[#034C52] font-semibold">
                  Numéro à appeler :
                </span>
                <div className="inline-flex items-center gap-2 bg-[#034C52] text-white px-5 py-3 rounded-lg">
                  <PhoneCall className="w-5 h-5" />
                  <span>+223 XXXXXXXX</span>
                </div>
                <span className="text-sm text-gray-500">
                  Veuillez appeler ce numéro depuis votre téléphone.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
