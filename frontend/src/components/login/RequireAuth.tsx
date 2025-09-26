import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const isUserLoggedIn = () => {
    return !!localStorage.getItem("user_token");
  };
  let location = useLocation();
  if (!isUserLoggedIn()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    const expire_time = localStorage.getItem("expire_time");
    if (expire_time != null) {
      if (new Date(expire_time) < new Date()) {
        localStorage.removeItem("user_token");
        localStorage.removeItem("expire_time");
        return <Navigate to="/login" state={{ from: location }} replace />;
      }
    } else {
      localStorage.removeItem("user_token");
      localStorage.removeItem("expire_time");
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  }

  return children;
};

export default RequireAuth;
