import { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate, Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { setIsAuthenticated, setUserName } = useApp(); // Importamos las funciones del contexto

  const handleRegister = async (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!name.trim()) newErrors.name = "El nombre es obligatorio.";
    if (!email.trim()) newErrors.email = "El correo es obligatorio.";
    if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "El correo no tiene un formato válido.";
    if (!password.trim()) newErrors.password = "La contraseña es obligatoria.";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setErrors({});
      const response = await axiosClient.post("/auth/register", {
        name,
        email,
        password,
      });

      // Guarda el token en localStorage
      localStorage.setItem("token", response.data.token);

      // Actualiza el estado global con la autenticación y el nombre del usuario
      setIsAuthenticated(true);
      setUserName(name);

      // Redirige al panel de tareas directamente
      navigate("/tasks");
    } catch (error) {
      console.error("Error al registrar usuario:", error.response?.data || error.message);
      setErrors({
        general:
          error.response?.data?.message || "Error al registrar el usuario. Por favor, inténtalo nuevamente.",
      });
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center px-4"
      style={{
        backgroundImage: "url('/to-do.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg">
        {/* Formulario */}
        <form onSubmit={handleRegister}>
          {errors.general && (
            <p className="bg-red-500 text-white text-sm p-2 rounded mb-4">{errors.general}</p>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Tu nombre"
            />
            {errors.name && <p className="text-red-500 text-xs italic mt-2">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Correo</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Tu correo electrónico"
            />
            {errors.email && <p className="text-red-500 text-xs italic mt-2">{errors.email}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Tu contraseña"
            />
            {errors.password && <p className="text-red-500 text-xs italic mt-2">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            Registrar
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
