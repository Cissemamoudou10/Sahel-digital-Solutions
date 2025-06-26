import { useEffect, useState } from "react";
import axiosClient from "../../utils/axiosClient";
import { FiPackage, FiUsers, FiImage } from "react-icons/fi";
import { useError } from "../../errorContext/ErrorContext";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [hasError, setHasError] = useState(false);
  const { showError } = useError();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosClient.get("/dashboard");
        setStats(res.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des stats:", err);
        setHasError(true);
        showError("Impossible de charger le tableau de bord.");
      }
    };

    fetchStats();
  }, []);

  if (hasError) {
    return (
      <div className="text-center text-red-600 font-medium p-10">
        Une erreur est survenue. Veuillez réessayer plus tard.
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center text-[#4A4A4A] p-10">
        Chargement du tableau de bord...
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#F4F8F8] min-h-screen text-[#1B1B1B]">
      <h1 className="text-3xl font-bold mb-6 text-[#034C52]">Tableau de bord</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Produits"
          value={stats.produits}
          icon={<FiPackage className="text-3xl text-[#FD4D01]" />}
        />
        <StatCard
          title="Utilisateurs"
          value={stats.utilisateurs}
          icon={<FiUsers className="text-3xl text-[#FD4D01]" />}
        />
        <StatCard
          title="Réalisations"
          value={stats.realisations}
          icon={<FiImage className="text-3xl text-[#FD4D01]" />}
        />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white border border-[#D9E1E2] rounded-xl shadow-sm p-5 hover:shadow-md transition duration-300 flex justify-between items-center">
    <div>
      <h2 className="text-sm text-[#4A4A4A] mb-1">{title}</h2>
      <p className="text-2xl font-bold text-[#034C52]">{value}</p>
    </div>
    <div className="bg-[#F4F8F8] p-3 rounded-full">
      {icon}
    </div>
  </div>
);

export default Dashboard;
