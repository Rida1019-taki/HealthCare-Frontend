import { Navigate } from "react-router-dom";

export default function RoleGuard({ children, roles }) {

    const role = localStorage.getItem("role");

    if (!roles.includes(role)) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}
