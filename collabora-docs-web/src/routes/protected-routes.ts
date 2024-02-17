import { lazy } from "react";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const Project = lazy(() => import("../pages/Project"));
const EditDocument = lazy(() => import("../pages/EditDocument"));

const privateRoutes: Route[] = [
  {
    path: "/dashboard",
    element: Dashboard,
  },
  {
    path: "/project/:projectId",
    element: Project,
  },
  {
    path: "/document/:documentId",
    element: EditDocument,
  },
];

export default privateRoutes;
