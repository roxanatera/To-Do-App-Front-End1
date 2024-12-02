import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { useApp } from "../context/AppContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [generalError, setGeneralError] = useState("");
  const navigate = useNavigate();
  const { setIsAuthenticated, setUserName } = useApp();

  const validateInputs = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    if (!email.trim()) {
      newErrors.email = "El correo es obligatorio.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "El correo no tiene un formato válido.";
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = "La contraseña es obligatoria.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setGeneralError("");

    if (!validateInputs()) {
      return;
    }

    try {
      const response = await axiosClient.post("/auth/login", { email, password });
      console.log("Respuesta de login:", response.data); // Log para depuración

      if (response.data.token && response.data.user.name) {
        // Guarda el token y el nombre en localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userName", response.data.user.name);

        // Actualiza el estado global
        setIsAuthenticated(true);
        setUserName(response.data.user.name);

        console.log("Navegando al panel de tareas..."); // Log de navegación
        navigate("/tasks"); // Redirige al panel de tareas
      } else {
        setGeneralError("Error: No se recibió el token o el nombre del usuario.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error.response?.data || error.message);
      setGeneralError(
        error.response?.data?.message || "Error al iniciar sesión. Por favor, inténtalo nuevamente."
      );
    }
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/to-do.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <form
        onSubmit={handleLogin}
        className="relative z-10 bg-white bg-opacity-90 p-6 rounded-lg shadow-md w-full max-w-sm sm:max-w-md"
      >
        <h1 className="text-4xl font-bold text-blue-500 mb-5 text-center">Inicia Sesión</h1>
        {generalError && (
          <p className="text-red-500 text-sm mb-4 text-center">{generalError}</p>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Correo</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring ${
              errors.email ? "border-red-500" : "focus:ring-blue-300"
            }`}
            placeholder="Correo"
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">{errors.email}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring ${
              errors.password ? "border-red-500" : "focus:ring-blue-300"
            }`}
            placeholder="Contraseña"
          />
          {errors.password && (
            <p className="text-red-500 text-xs italic">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Iniciar Sesión
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </form>
    </div>
  );
}
