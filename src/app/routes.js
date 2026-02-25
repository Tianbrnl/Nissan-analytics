import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Login } from "./pages/Login";
import { ForgotPassword } from "./pages/ForgotPassword";
import { Dashboard } from "./pages/Dashboard";
import { VehicleReports } from "./pages/VehicleReports";
import { ApplicationsApprovals } from "./pages/ApplicationsApprovals";
import { VehicleSalesPerGroup } from "./pages/VehicleSalesPerGroup";
import { Pipeline } from "./pages/Pipeline";
import { ReleasePlan } from "./pages/ReleasePlan";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/forgot-password",
    Component: ForgotPassword,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "vehicle-reports", Component: VehicleReports },
      { path: "applications", Component: ApplicationsApprovals },
      { path: "vehicle-sales", Component: VehicleSalesPerGroup },
      { path: "pipeline", Component: Pipeline },
      { path: "release-plan", Component: ReleasePlan },
    ],
  },
]);
