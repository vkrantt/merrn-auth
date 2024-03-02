import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const userDetail = useSelector((state) => {
    return state.auth.userDetail;
  });
  return userDetail ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
