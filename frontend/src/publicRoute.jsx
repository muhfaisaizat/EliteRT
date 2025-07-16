import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp && decoded.exp < currentTime) {
      localStorage.removeItem("token");
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};

const PublicRoute = ({ element: Component, ...rest }) => {
  const isLoggedIn = isAuthenticated();

  if (isLoggedIn) {
    return <Navigate to="/panel" />;
  }

  return <Component {...rest} />;
};

export default PublicRoute;
