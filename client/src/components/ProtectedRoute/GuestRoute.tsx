import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

type GuestRouteType = {
  element: React.ReactElement;
};

const GuestRoute = ({ element }: GuestRouteType) => {
  const token = Cookies.get("token");

  if (token) {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default GuestRoute;
