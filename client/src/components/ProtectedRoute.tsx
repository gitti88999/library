import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // const user = useSelector((state: RootState) => state.auth.user);
  const authLoading = useSelector((state: RootState) => state.myUser.authLoading);

  const user = useSelector((state: RootState) => state.myUser.currentUser);
  
 const isAuthChecked = useSelector(
  (state: RootState) => state.myUser.isAuthChecked
);
console.log("AUTH CHECKED:", isAuthChecked);
console.log("USER:", user);
// if (!isAuthChecked) {
//   return null; // או loader
// }
if (!isAuthChecked) {
return <div>Loading...</div>;}

if (!user) {
  return <Navigate to="/login" replace />;
}

return <>{children}</>;
};


export default ProtectedRoute;
