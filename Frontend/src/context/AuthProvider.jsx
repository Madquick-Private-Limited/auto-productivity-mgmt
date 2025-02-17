import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refreshToken")
  );
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isInactivityLogout, setIsInactivityLogout] = useState(false);
  const [userRole, setUserRole] = useState(() => {
    const token = localStorage.getItem("accessToken");
    return token ? jwtDecode(token).role : null;
  });
  const navigate = useNavigate();

  let logoutTimer;
  let refreshTimer;

  useEffect(() => {
    const initAuth = async () => {
      const savedAccessToken = localStorage.getItem("accessToken");
      const savedRefreshToken = localStorage.getItem("refreshToken");

      if (savedAccessToken && savedRefreshToken) {
        try {
          const decodedToken = jwtDecode(savedAccessToken);

          // Check if the token is expired
          if (decodedToken.exp * 1000 < Date.now()) {
            await refreshAccessToken(savedRefreshToken); // If expired, refresh token
          } else {
            // If valid, set access token, refresh token, and user state
            setAccessToken(savedAccessToken);
            setRefreshToken(savedRefreshToken);
            setUser({ ...decodedToken, loginTime: new Date().toISOString() });
            setUserRole(decodedToken.role);

            // Set timers for refreshing the token and auto-logout
            setRefreshTimer(
              decodedToken.exp * 1000 - Date.now(),
              savedRefreshToken
            );
            startLogoutTimer();
          }
        } catch (error) {
          console.error("Error decoding token", error);
          logout(); // Logout in case of error
        }
      }
    };

    initAuth(); // Call the init function on component mount
  }, []);

  const startLogoutTimer = () => {
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
    logoutTimer = setTimeout(() => {
      if (!isLoggingOut && user) {
        setIsInactivityLogout(true);
        logout();
      }
    }, 5 * 60 * 1000); // Auto logout after 5 minutes of inactivity
  };

  const refreshAccessToken = async (refreshToken) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user-refresh-token`,
        {
          incomingRefreshToken: refreshToken,
        }
      );

      const { accessToken: newAccessToken } = await res.data.data;
      localStorage.setItem("accessToken", newAccessToken);
      setAccessToken(newAccessToken);

      const decodedUser = jwtDecode(newAccessToken);
      setUser({ ...decodedUser, loginTime: user?.loginTime });
      setRefreshTimer(decodedUser.exp * 1000 - Date.now(), refreshToken);
    } catch (error) {
      console.error("Error refreshing access token", error);
      logout();
    }
  };

  const setRefreshTimer = (timeUntilExpiry, refreshToken) => {
    if (refreshTimer) {
      clearTimeout(refreshTimer);
    }

    refreshTimer = setTimeout(() => {
      refreshAccessToken(refreshToken);
    }, Math.max(timeUntilExpiry - 30000, 10000)); // Refresh 30 seconds before expiry
  };

  const login = (accessToken, refreshToken) => {
    const loginTime = new Date().toISOString();
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    try {
      const decodedUser = jwtDecode(accessToken);
      setUser({ ...decodedUser, loginTime });
      setUserRole(decodedUser.role);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setRefreshTimer(decodedUser.exp * 1000 - Date.now(), refreshToken);
      startLogoutTimer();
      navigate("/management");
    } catch (error) {
      console.error("Error decoding token during login", error);
    }
  };

  const logout = async () => {
    if (!user) return;
    const logoutTime = new Date();
    const loginTime = user.loginTime ? new Date(user.loginTime) : new Date();
    const sessionDuration = Math.floor((logoutTime - loginTime) / 1000); // in seconds

    if (isLoggingOut) return;
    setIsLoggingOut(true);

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user-logout`, {
        userId: user?.id,
      });

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setUser(null);
      setUserRole(null);
      setAccessToken(null);
      setRefreshToken(null);
      if (isInactivityLogout) {
        alert("You have been logged out due to inactivity.");
        setIsInactivityLogout(false);
      }
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, userRole, accessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
