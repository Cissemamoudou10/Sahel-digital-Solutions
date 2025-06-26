import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { assets } from "../assets/assets";
import axiosClient from "../utils/axiosClient";
import useAuth from "../authContext/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!pseudo || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const res = await axiosClient.post("/auth/login", {
        pseudo,
        mot_de_passe: password,
      });
      login(res.data.token, res.data.user);
      navigate("/adminPanel/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Erreur de connexion.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F8F8] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <div className="flex justify-center mb-6">
          <img src={assets.logoSDWhite} alt="Sahel Digital" className="h-12" />
        </div>

        <h1 className="text-2xl font-bold text-center text-[#034C52] mb-2">
          Connexion
        </h1>
        <p className="text-sm text-center text-[#4A4A4A] mb-6">
          Accédez à votre espace d'administration
        </p>

        {error && (
          <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-[#1B1B1B]">Pseudo</label>
            <input
              type="text"
              className="w-full border border-[#D9E1E2] px-3 py-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-[#034C52]"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
            />
          </div>

          <div className="relative">
            <label className="text-sm font-medium text-[#1B1B1B]">
              Mot de passe
            </label>
            <input
              type={showPass ? "text" : "password"}
              className="w-full border border-[#D9E1E2] px-3 py-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-[#034C52]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPass((prev) => !prev)}
              className="absolute right-3 top-[38px] text-[#034C52]"
            >
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#034C52] hover:bg-[#026168] text-white py-2 rounded font-semibold transition flex items-center justify-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Se connecter"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
