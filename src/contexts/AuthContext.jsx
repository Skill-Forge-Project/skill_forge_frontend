import { createContext, useState } from "react";

export const AuthContext = createContext();

const AUTH_API = import.meta.env.VITE_AUTH_API;

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Optionally, check session status on app load (e.g. ping a /me or /protected endpoint)

  const loginUser = async (form) => {
    const res = await fetch(`${AUTH_API}/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Login failed");
    }

    setIsAuthenticated(true);
  };

  const logoutUser = async () => {
    await fetch(`${AUTH_API}/logout`, {
      method: "POST",
      credentials: "include",
    });

    setIsAuthenticated(false);
  };

  const contextValues = {
    isAuthenticated,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
}
