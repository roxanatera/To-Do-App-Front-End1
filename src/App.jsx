import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext"; // Asegúrate de que la ruta sea correcta
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TaskPage from "./pages/TaskPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para manejar autenticación

  useEffect(() => {
    // Verificar si hay un token en localStorage
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Actualiza el estado según la existencia del token
  }, []);

  return (
    <Router>
      <AppProvider>
        <Routes>
          {/* Ruta raíz con redirección condicional */}
          <Route
            path="/"
            element={
              isAuthenticated ? <Navigate to="/tasks" replace /> : <Navigate to="/login" replace />
            }
          />
          {/* Rutas definidas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/tasks"
            element={isAuthenticated ? <TaskPage /> : <Navigate to="/login" replace />}
          />
          {/* Ruta para manejar rutas no encontradas */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppProvider>
    </Router>
  );
}

export default App;
