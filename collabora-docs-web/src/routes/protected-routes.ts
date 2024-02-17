import { lazy } from "react";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const Project = lazy(() => import("../pages/Project"));

const privateRoutes: Route[] = [
  {
    path: "/dashboard",
    element: Dashboard,
  },
  {
    path: "/project/:projectId",
    element: Project,
  },
];

export default privateRoutes;
