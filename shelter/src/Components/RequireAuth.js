import authContext from "Helpers/AuthContext";
import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
  const { authenticated, roles } = useContext(authContext);
  const location = useLocation();

  return roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : authenticated ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
