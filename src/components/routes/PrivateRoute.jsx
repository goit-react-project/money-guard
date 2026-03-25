import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/authSlice";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  //isLoggedIn true ise children yani korunan sayfaya render edilir, false ise login sayfasına yönlendirilir
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return isLoggedIn ? children : <Navigate to="/login" />;
};
export default PrivateRoute;
