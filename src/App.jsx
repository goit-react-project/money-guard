import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "./redux/auth/authOperations";
import { selectIsRefreshing } from "./redux/auth/authSlice";
import PrivateRoute from "./components/routes/PrivateRoute";
import PublicRoute from "./components/routes/PublicRoute";
import Loader from "./components/Loader/Loader.jsx";

const RegistrationPage = lazy(() => import("./pages/RegistrationPage/RegistrationPage.jsx"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage/DashboardPage"));
const HomeTab = lazy(() => import("./components/HomeTab/HomeTab"));
const StatisticsTab = lazy(() => import("./components/StatisticsTab/StatisticsTab"));
const CurrencyTab = lazy(() => import("./components/CurrencyTab/CurrencyTab"));

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  if (isRefreshing) return null;

  return (
    <>
      <Loader />
      <Suspense fallback={null}>
      <Routes>
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegistrationPage />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
          />
        <Route
          path="/home"
          element={<HomeTab />}
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        >
          <Route path="home" element={<HomeTab />} />
          <Route path="statistics" element={<StatisticsTab />} />
          <Route path="currency" element={<CurrencyTab />} />
          <Route index element={<Navigate to="home" />} />
        </Route>
         <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
      </Suspense>
    </>
  );
};

export default App;
