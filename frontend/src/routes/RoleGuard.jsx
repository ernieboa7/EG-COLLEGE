import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function RoleGuard({ allow = [] }) {
  const role = useSelector((s) => s.auth.role);
  if (!allow.includes(role)) return <Navigate to="/portal" replace />;
  return <Outlet />;
}
