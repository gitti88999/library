import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = useSelector((state: RootState) => state.myUser.currentUser);
  const isAuthChecked = useSelector((state: RootState) => state.myUser.isAuthChecked);

  if (!isAuthChecked) {
    return <div>Loading...</div>;
  }
console.log("AUTH CHECK:", user);
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
