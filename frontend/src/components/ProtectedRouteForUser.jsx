import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRouteForUser = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null || user.role !== "student") {
      navigate("/admin/companies");
    }
  }, [user, navigate]);

  return <>{children}</>;
};

export default ProtectedRouteForUser;
