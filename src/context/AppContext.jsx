import { createContext, useState, useContext, useEffect } from "react";
import AxiosInterceptor from "../config/axiosInterceptor";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  const login = async (credentials) => {
    try {
      setLoading(true);
      const body = {
        email: credentials.email,
        password: credentials.password,
      };
      const profile = await AxiosInterceptor.post(
        "http://localhost:2233/api/auth/login",
        body
      );

      if (profile?.status == 200) {
        setUser(profile?.data?.data);
        sessionStorage.setItem("token", profile?.data?.data?.token);
        localStorage.setItem("user", JSON.stringify(profile?.data?.data));
        setError(null);
      } else {
        setUser(null);
        setError(profile?.message);
      }
      // setUser({ name: "Admin", role: "admin" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (data) => {
    try {
      setLoading(true);
      const body = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      const profile = await AxiosInterceptor.post(
        "http://localhost:2233/api/auth/profile",
        body
      );

      if (profile?.status == 201) {
        setUser(profile?.data?.data);
        sessionStorage.setItem("token", profile?.data?.data?.token);
        localStorage.setItem("user", JSON.stringify(profile?.data?.data));
        setError(null);
      } else {
        setUser(null);
        setError(profile?.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
    localStorage.removeItem("user");
  };

  return (
    <AppContext.Provider
      value={{
        user,
        loading,
        error,
        sidebarOpen,
        setSidebarOpen,
        signup,
        login,
        logout,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
