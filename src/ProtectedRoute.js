import { Redirect, Route } from "react-router-dom";
import { useAuth } from "./Context/AuthProvider";

export const ProtectedRoute = ({ children, ...props }) => {
  const { user } = useAuth();

  return user ? <Route {...props}> {children} </Route> : <Redirect to="/" />;
};
