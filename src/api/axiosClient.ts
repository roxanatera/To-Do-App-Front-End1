import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:10000/api",
});

// Interceptor para agregar el token de autorización
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("Token adjuntado:", token); // Log para depurar
  } else {
    console.warn("Token no encontrado en localStorage");
  }
  return config;
});


// Interceptor para manejar errores globalmente
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Token inválido o expirado.");
      localStorage.removeItem("token");
      window.location.href = "/login"; // Redirige al inicio de sesión
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
