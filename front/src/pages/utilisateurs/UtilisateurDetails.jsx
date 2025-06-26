import { useNavigate, useLoaderData } from "react-router-dom";

const UtilisateurDetails = () => {
  const navigate = useNavigate();
  const utilisateur = useLoaderData();

  const getInitials = (name) => {
    if (!name || typeof name !== "string") return "?";
    const trimmed = name.trim();
    if (trimmed.length === 0) return "?";
    return trimmed.charAt(0).toUpperCase();
  };

  if (!utilisateur) {
    return <div className="p-6 text-[#FD4D01]">Utilisateur non trouvé.</div>;
  }

  return (
    <div className="p-6 bg-[#FFFFFF] rounded-xl shadow-md max-w-xl mx-auto border border-[#D9E1E2]">
      <h1 className="text-2xl font-bold text-[#034C52] mb-6">
        Détails de l'utilisateur
      </h1>

      <div className="flex justify-center mb-6">
        <div className="w-32 h-32 flex items-center justify-center bg-[#034C52] text-white text-4xl font-bold rounded-full border border-[#D9E1E2]">
          {getInitials(utilisateur.pseudo)}
        </div>
      </div>

      <div className="space-y-3 text-[#1B1B1B] text-lg">
        <p>
          <span className="font-semibold text-[#4A4A4A]">Pseudo :</span>{" "}
          {utilisateur.pseudo}
        </p>
        <p>
          <span className="font-semibold text-[#4A4A4A]">Rôle :</span>{" "}
          {utilisateur.role}
        </p>
      </div>

      <div className="mt-8 flex gap-4">
        <button
          onClick={() =>
            navigate(`/adminPanel/utilisateurs/modifier/${utilisateur.id}`)
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

export default UtilisateurDetails;
