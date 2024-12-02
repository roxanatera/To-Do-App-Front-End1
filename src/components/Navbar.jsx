import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { handleLogout, userName, isAuthenticated } = useApp();
  const [showModal, setShowModal] = React.useState(false);

  const goHome = () => {
    navigate(isAuthenticated ? "/tasks" : "/");
  };

  const confirmLogout = () => {
    setShowModal(true);
  };

  const logout = () => {
    handleLogout();
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-4 shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center cursor-pointer" onClick={goHome}>
            <img
              src="/to-do.webp"
              alt="To-Do App Logo"
              className="w-12 h-12 rounded-full mr-3 border-2 border-white"
            />
            <span className="text-2xl font-bold">To-Do App</span>
          </div>
          {isAuthenticated && (
            <div className="flex items-center gap-4">
              <span className="text-lg font-semibold">
                Bienvenido, {userName || "Cargando..."}
              </span>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </nav>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg mb-4">¿Estás seguro de que deseas salir?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Salir
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
