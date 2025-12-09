import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Function to update state from localStorage
  const updateFromStorage = () => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    setIsLoggedIn(!!token);
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  // Check localStorage on mount and listen for changes
  useEffect(() => {
    // Initial check
    updateFromStorage();

    // Listen for storage changes (other tabs)
    window.addEventListener("storage", updateFromStorage);
    
    // Listen for custom auth change event (same tab)
    window.addEventListener("authChange", updateFromStorage);

    return () => {
      window.removeEventListener("storage", updateFromStorage);
      window.removeEventListener("authChange", updateFromStorage);
    };
  }, []);

  const login = (token, userData) => {
    // Save to localStorage
    if (token) {
      localStorage.setItem("token", token);
    }
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
    }
    // Update state from localStorage
    updateFromStorage();
    // Trigger event for other components
    window.dispatchEvent(new Event("authChange"));
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    window.dispatchEvent(new Event("authChange"));
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, updateFromStorage }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
