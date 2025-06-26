import { Navigate } from "react-router-dom";
import  useAuth  from "../authContext/useAuth";
import { assets } from "../assets/assets";

const LoaderLogo = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <img
        src={assets.logoSDWhite}
        alt="Logo Sahel Digital Solution"
        className="w-32 h-32 animate-pulse"
      />
    </div>
  );
};

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoaderLogo />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateRoute;
