import { Navigate, Route, Routes } from "react-router-dom";
import { authRoutes, protectedRoutes } from "./routes";
import { AuthLayout, ProtectedLayout } from "./layouts";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth/login" />} />
      <Route element={<AuthLayout />}>
        {authRoutes.map((item, index) => (
          <Route key={index} path={item.path} element={<item.element />} />
        ))}
      </Route>

      <Route element={<AuthLayout />}>
        {protectedRoutes.map((item, index) => (
          <Route key={index} path={item.path} element={<item.element />} />
        ))}
      </Route>

      <Route path="*" element={<h1>404 Page Not found</h1>} />
    </Routes>
  );
}
