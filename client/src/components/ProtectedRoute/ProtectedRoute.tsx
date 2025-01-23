import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

type ProtectedRouteType = {
  element: React.ReactElement;
};

const ProtectedRoute = ({ element }: ProtectedRouteType) => {
  const token = Cookies.get("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default ProtectedRoute;
