import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

/**
 * PublicOrStudentRoute
 * - Allows guests (not logged in) and students
 * - Blocks recruiters
 */
export const PublicOrStudentRoute = ({ children }) => {
  const { user, loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, [user, loading, navigate]);

  if (loading) return null;
  if (user?.role === "recruiter") return null;
  return <>{children}</>;
};

/**
 * StudentOnlyRoute
 * - Allows only logged-in students
 * - Blocks guests and recruiters
 */
export const StudentOnlyRoute = ({ children }) => {
  const { user, loading } = useSelector((store) => store.auth);

  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "student") {
    return <Navigate to="/" replace />;
  }

  return children;
};
