import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("fleet_user"));
    if (data) setUser(data.user);
  }, []);

  const login = (data) => {
    localStorage.setItem("fleet_user", JSON.stringify(data));
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("fleet_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);