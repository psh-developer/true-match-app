import RootLayout from "@/components/layouts/root-layout"
import { createBrowserRouter } from "react-router"
import DashboardLayout from "./components/dashboard"
import { Page404 } from "./components/pages"
import { authRoutes } from "./features/auth"
import { dashboardRoutes } from "./features/dashboard"
import { usersRoutes } from "./features/users"

const notFoundRoute = { path: "*", element: <Page404 /> }

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "d",
        element: <DashboardLayout />,
        children: [...dashboardRoutes, ...usersRoutes, notFoundRoute],
      },
      ...authRoutes,
      notFoundRoute,
    ],
  },
])
