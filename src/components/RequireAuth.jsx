import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const { userUuid } = useContext(LoginContext);
  const location = useLocation();

  if (!userUuid) {
    return <Navigate to="/profile" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAuth;