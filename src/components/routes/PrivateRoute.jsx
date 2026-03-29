import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  //isLoggedIn true ise children yani korunan sayfaya render edilir, false ise login sayfasına yönlendirilir
   return children;
};
export default PrivateRoute;
