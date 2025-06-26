import { useRouteError } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  console.error(error);

  return (
    <div className="h-screen flex flex-col justify-center items-center text-center px-4">
      <FaExclamationTriangle className="text-red-500 text-5xl mb-4" />
      <h1 className="text-3xl font-bold mb-2 text-gray-800">
        Une erreur est survenue
      </h1>
      <p className="text-gray-600 mb-4">
        {error?.statusText || error?.message || "Erreur inconnue"}
      </p>
      <button
        onClick={() => navigate(-1)}
        className="mt-2 inline-block px-4 py-2 bg-[#FD4D01] text-white rounded hover:bg-[#e44300] cursor-pointer"
      >
        Retour
      </button>
    </div>
  );
};

export default ErrorPage;
