import React, { useEffect, useState } from "react";
import axiosClient from "../../utils/axiosClient";

// Génère aléatoirement une taille de carte
const getRandomSize = () => {
  const sizes = ["col-span-1", "col-span-2", "lg:col-span-1", "lg:col-span-2"];
  return sizes[Math.floor(Math.random() * sizes.length)];
};

const RealisationItem = ({ image, title }) => {
  const [sizeClass, setSizeClass] = useState("");

  useEffect(() => {
    setSizeClass(getRandomSize());
  }, []);

  return (
    <div
      className={`rounded-xl overflow-hidden shadow-lg border border-[#D9E1E2] bg-white ${sizeClass}`}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-t-xl"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-[#034C52]">{title}</h3>
        <p className="text-sm text-[#4A4A4A] mt-1">
          Projet réalisé avec soin pour sublimer l'image de nos clients.
        </p>
      </div>
    </div>
  );
};

const Realisations = () => {
  const [realisations, setRealisations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState(null);

  const fetchRealisations = async () => {
    try {
      const res = await axiosClient.get("/realisations/search");
      const data = res.data.data.map((item) => ({
        ...item,
        image: `${axiosClient.defaults.baseURL}${item.imageUrl}`,
      }));
      setRealisations(data);
    } catch (err) {
      console.error("Erreur de chargement des réalisations :", err);
      setErreur("Échec du chargement des réalisations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRealisations();
  }, []);

  return (
    <section
      className="px-4 md:px-12 lg:px-24 py-20"
      style={{ backgroundColor: "#f4f8f818" }}
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-[#034C52] mb-2">
          Nos Réalisations
        </h2>
        <div className="h-1 w-16 bg-[#FD4D01] mx-auto rounded mt-2"></div>
        <p className="max-w-xl mx-auto text-[#4A4A4A] mt-4">
          Une galerie désorganisée et vivante de notre créativité au service du digital.
        </p>
      </div>

      {loading ? (
        <p className="text-center text-[#4A4A4A]">Chargement…</p>
      ) : erreur ? (
        <p className="text-center text-red-500">{erreur}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
          {realisations.map((item, index) => (
            <RealisationItem
              key={index}
              image={item.imageUrl}
              title={item.title}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Realisations;
