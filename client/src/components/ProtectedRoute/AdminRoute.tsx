import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

type AdminRouteType = {
  element: React.ReactElement;
};

const AdminRoute = ({ element }: AdminRouteType) => {
  const token = Cookies.get("token");
  const role = Cookies.get("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default AdminRoute;
