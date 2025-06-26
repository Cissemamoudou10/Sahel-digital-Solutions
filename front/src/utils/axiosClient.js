// src/utils/axiosClient.js
import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Ajouter le token automatiquement
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("Sahel_Digital_Solutions_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Gérer les erreurs globales (optionnel mais conseillé)
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("Sahel_Digital_Solutions_token");
      localStorage.removeItem("Sahel_Digital_Solutions_user");
      window.location.href = "/login"; // ou navigate('/login') si tu es dans React Router
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
