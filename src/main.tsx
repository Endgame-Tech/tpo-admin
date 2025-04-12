import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import LandingPage from "./pages/LandingPage";
import DashboardLayout from "./pages/dashboard/page.tsx";
import Dashboard from "./pages/dashboard/dashboard/page";
import AuthPage from "./pages/auth/page";
import LoginPage from "./pages/auth/LoginPage";
import { ThemeProvider } from "./context/ThemeContexts.tsx";
import Analytics from "./pages/dashboard/analytics/page.tsx";
import { AuthProvider } from "./context/AuthContexts.tsx";
import { ToastProvider } from "./components/Toast.tsx";
import ResourcesLayout from "./pages/dashboard/resources/page.tsx";
import AddResource from "./pages/dashboard/resources/add/page.tsx";
import ViewResource from "./pages/dashboard/resources/[id]/view/page.tsx";
import Layout from "./pages/dashboard/resources/[id]/page.tsx";
import Resources from "./pages/dashboard/resources/resources/page.tsx";
import EditResource from "./pages/dashboard/resources/[id]/edit/page.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    // errorElement: <ErrorPage />,
  },

  {
    path: "/auth",
    element: <AuthPage />,
    children: [
      //     {
      //       path: "verify",
      //       element: <VerificationPage />,
      //     },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "resources",
        element: <ResourcesLayout />,
        children: [
          {
            path: "",
            element: <Resources />,
          },
          {
            path: "add",
            element: <AddResource />,
          },
          {
            path: ":id",
            element: <Layout />,
            children: [
              {
                path: "view",
                element: <ViewResource />,
              },
              {
                path: "edit",
                element: <EditResource />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

// const root = ReactDOM.createRoot(document.getElementById("root"));
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <ToastProvider>
      <AuthProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
    </ToastProvider>
  </React.StrictMode>
);

// reportWebVitals();
