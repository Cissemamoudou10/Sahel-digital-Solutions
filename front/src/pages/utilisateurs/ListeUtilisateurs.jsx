import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt, FaEdit, FaEye, FaPlus } from "react-icons/fa";
import { useError } from "../../errorContext/ErrorContext";
import axiosClient from "../../utils/axiosClient";

const ListeUtilisateurs = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [utilisateurASupprimer, setUtilisateurASupprimer] = useState(null);
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { showError } = useError();

  const getUsers = async (
    searchValue = "",
    page = 1,
    limit = rowsPerPage,
    sortBy = "id",
    order = "DESC"
  ) => {
    setIsLoading(true);
    try {
      const res = await axiosClient.get("/utilisateurs/search", {
        params: {
          search: searchValue,
          page,
          limit,
          sortBy,
          order,
        },
      });
      console.log(res.data);
      setUtilisateurs(res.data.data);
      setTotal(res.data.total);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Erreur lors de la récupération des utilisateurs";
      showError(message);
      setUtilisateurs([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers(search, currentPage, rowsPerPage);
  }, [search, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(total / rowsPerPage);

  const handleChangeRows = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handleDeleteClick = (utilisateur) => {
    setUtilisateurASupprimer(utilisateur);
    setShowModal(true);
  };

  const confirmerSuppression = async () => {
    setIsDeleting(true);
    try {
      await axiosClient.delete(`/utilisateurs/${utilisateurASupprimer.id}`);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Erreur lors de la suppression de l'utilisateur";
      showError(message);
    } finally {
      setIsDeleting(false);
      setShowModal(false);
      setUtilisateurASupprimer(null);
      getUsers(search, currentPage, rowsPerPage);
    }
  };

  const annulerSuppression = () => {
    setShowModal(false);
    setUtilisateurASupprimer(null);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      {/* Barre supérieure */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Rechercher un utilisateur..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border border-gray-300 rounded-md w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-[#034C52]"
        />

        <button
          onClick={() => navigate("/adminPanel/utilisateurs/ajouter")}
          className="flex items-center gap-2 bg-[#FD4D01] text-white px-4 py-2 rounded-md hover:bg-[#e44300] transition"
        >
          <FaPlus /> Nouvel Utilisateur
        </button>
      </div>

      {/* Tableau des utilisateurs */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-[#034C52] text-white text-sm">
            <tr>
              <th className="px-4 py-3">Pseudo</th>
              <th className="px-4 py-3">Rôle</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="3" className="text-center py-6">
                  <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-[#034C52] mx-auto rounded-full"></div>
                </td>
              </tr>
            ) : utilisateurs?.length > 0 ? (
              utilisateurs.map((utilisateur) => (
                <tr
                  key={utilisateur.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">{utilisateur.pseudo}</td>
                  <td className="px-4 py-3">{utilisateur.role}</td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <button
                      title="Afficher"
                      onClick={() =>
                        navigate(`/adminPanel/utilisateurs/${utilisateur.id}`)
                      }
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEye />
                    </button>
                    <button
                      title="Modifier"
                      onClick={() =>
                        navigate(
                          `/adminPanel/utilisateurs/modifier/${utilisateur.id}`
                        )
                      }
                      className="text-green-600 hover:text-green-800"
                    >
                      <FaEdit />
                    </button>
                    <button
                      title="Supprimer"
                      onClick={() => handleDeleteClick(utilisateur)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-500">
                  Aucun utilisateur trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4">
        <div className="text-sm text-gray-600">
          Afficher&nbsp;
          <select
            value={rowsPerPage}
            onChange={handleChangeRows}
            className="border px-2 py-1 rounded"
          >
            {[5, 10, 20].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          &nbsp;éléments par page
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Précédent
          </button>
          <span className="text-sm text-gray-700">
            Page {currentPage} / {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Suivant
          </button>
        </div>
      </div>

      {/* Modal de confirmation de suppression */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-md">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Supprimer l'utilisateur ?
            </h2>
            <p className="text-gray-700 mb-6">
              Voulez-vous vraiment supprimer l'utilisateur{" "}
              <span className="font-semibold text-red-600">
                {utilisateurASupprimer?.pseudo}
              </span>{" "}
              ?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={annulerSuppression}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                Annuler
              </button>
              <button
                onClick={confirmerSuppression}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                {isDeleting ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                ) : (
                  "Supprimer"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListeUtilisateurs;
