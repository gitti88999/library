import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // const user = useSelector((state: RootState) => state.auth.user);
  const user = useSelector((state: RootState) => state.myUser.currentUser);
 
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
