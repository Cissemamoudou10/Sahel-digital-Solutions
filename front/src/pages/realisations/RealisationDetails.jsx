import { useNavigate, useLoaderData } from "react-router-dom";

const RealisationDetails = () => {
  const navigate = useNavigate();
  const realisation = useLoaderData();
  const baseUrl = import.meta.env.VITE_API_URL;

  const getInitials = (name) => {
    if (!name || typeof name !== "string") return "?";
    const trimmed = name.trim();
    if (trimmed.length === 0) return "?";
    return trimmed.charAt(0).toUpperCase();
  };

  if (!realisation) {
    return <div className="p-6 text-[#FD4D01]">Réalisation non trouvée.</div>;
  }

  return (
    <div className="p-6 bg-[#FFFFFF] rounded-xl shadow-md max-w-xl mx-auto border border-[#D9E1E2]">
      <h1 className="text-2xl font-bold text-[#034C52] mb-6">
        Détails de la réalisation
      </h1>

      <div className="flex justify-center mb-6">
        {realisation.imageUrl ? (
          <img
            src={realisation.imageUrl}
            alt={realisation.titre}
            className="w-48 h-48 object-cover rounded-xl border border-[#D9E1E2]"
          />
        ) : (
          <div className="w-48 h-48 flex items-center justify-center bg-[#034C52] text-white text-4xl font-bold rounded-xl border border-[#D9E1E2]">
            {getInitials(realisation.titre)}
          </div>
        )}
      </div>

      <div className="space-y-3 text-[#1B1B1B]">
        <p>
          <span className="font-semibold text-[#4A4A4A]">Titre :</span>{" "}
          {realisation.titre}
        </p>
        <p>
          <span className="font-semibold text-[#4A4A4A]">Catégorie :</span>{" "}
          {realisation.categorie}
        </p>
        <p>
          <span className="font-semibold text-[#4A4A4A]">
            Date de création :
          </span>{" "}
          {new Date(realisation.createdAt).toLocaleDateString()}
        </p>
        <p>
          <span className="font-semibold text-[#4A4A4A]">Description :</span>{" "}
          {realisation.description ? (
            realisation.description
          ) : (
            <span className="italic text-gray-400">Aucune description</span>
          )}
        </p>
      </div>

      <div className="mt-8 flex gap-4">
        <button
          onClick={() =>
            navigate(`/adminPanel/realisations/modifier/${realisation.id}`)
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

export default RealisationDetails;
