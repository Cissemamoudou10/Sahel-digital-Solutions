import React from "react";
import { useError } from "./ErrorContext";

const ErrorModal = () => {
  const { errorMessage, clearError } = useError();

  if (!errorMessage) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded shadow-lg p-6 max-w-sm w-full text-center">
        <h2 className="text-xl font-bold mb-4 text-[#FD4D01]">Erreur</h2>
        <p className="mb-6 text-[#1B1B1B]">{errorMessage}</p>
        <button
          onClick={clearError}
          className="px-4 py-2 bg-[#034C52] text-white rounded hover:bg-[#026066] transition"
        >
          Fermer
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
