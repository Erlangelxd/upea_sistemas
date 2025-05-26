import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "Estudiante Ejemplo",
    career: "Ing. en Sistemas",
    semester: 5,
    avatarUrl: "https://...png",
  });

  const toggleAuth = () => setIsAuthenticated(!isAuthenticated);
  const updateUser = (data) => setCurrentUser(prev => ({ ...prev, ...data }));

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, toggleAuth, currentUser, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
