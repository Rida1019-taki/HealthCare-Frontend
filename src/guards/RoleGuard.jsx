import { Navigate } from "react-router-dom";

export default function RoleGuard({ children, roles }) {
  const rawRole = localStorage.getItem("role") || "";
  const role = rawRole.replace(/^ROLE_/, "").trim().toUpperCase();

  if (!roles.includes(role)) {
    return <Navigate to="/403" replace />;
  }

  return children;
}
