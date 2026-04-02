import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import LoginPage from "../pages/auth/login/page";
import RegisterPage from "../pages/auth/register/page";
import ForgotPasswordPage from "../pages/auth/forgot-password/page";
import DashboardPage from "../pages/dashboard/page";
import NewInventoryPage from "../pages/inventory/new/page";
import InventoryDetailPage from "../pages/inventory/detail/page";
import ReportPage from "../pages/inventory/report/page";
import ConciergeriePage from "../pages/conciergerie/page";
import ProtectedRoute from "../components/feature/ProtectedRoute";

const routes: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/conciergerie", element: <ConciergeriePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/forgot-password", element: <ForgotPasswordPage /> },
  {
    path: "/dashboard",
    element: <ProtectedRoute><DashboardPage /></ProtectedRoute>,
  },
  {
    path: "/inventory/new",
    element: <ProtectedRoute><NewInventoryPage /></ProtectedRoute>,
  },
  {
    path: "/inventory/:id",
    element: <ProtectedRoute><InventoryDetailPage /></ProtectedRoute>,
  },
  {
    path: "/inventory/:id/report",
    element: <ProtectedRoute><ReportPage /></ProtectedRoute>,
  },
  { path: "*", element: <NotFound /> },
];

export default routes;
