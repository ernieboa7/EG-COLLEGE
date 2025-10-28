import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";


 // Protect routes based on login and role.

export default function ProtectedRoute({ children, isAdmin = false }) {
  const { token, role } = useSelector((state) => state.auth);

  if (!token) return <Navigate to="/login" replace />;
  if (isAdmin && role !== "admin") return <Navigate to="/" replace />;
  if (children) return children;
  return <Outlet />;
}
