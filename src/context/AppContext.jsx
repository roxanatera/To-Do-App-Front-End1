import { createContext, useState, useEffect, useContext } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);

      // Supongamos que el nombre del usuario también se guarda en localStorage
      const savedUserName = localStorage.getItem("userName");
      if (savedUserName) {
        setUserName(savedUserName);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setIsAuthenticated(false);
    setUserName(""); // Limpia el nombre del usuario
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userName,
        setUserName,
        handleLogout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
