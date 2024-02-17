import { lazy } from "react";

const Register = lazy(() => import("../pages/auth/Register"));
const Login = lazy(() => import("../pages/auth/Login"));

const authRoutes: Route[] = [
  {
    path: "/auth/login",
    element: Login,
  },
  {
    path: "/auth/register",
    element: Register,
  },
];

export default authRoutes;
