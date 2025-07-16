import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // dalam detik
    if (decoded.exp && decoded.exp < currentTime) {
      localStorage.removeItem("token"); // hapus token yang sudah expired
      return false;
    }
    return true;
  } catch (error) {
    console.error("Token tidak valid:", error);
    return false;
  }
};

const ProtectedRoute = ({ element }) => {
  const isLoggedIn = isAuthenticated();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return element;
};

export default ProtectedRoute;
