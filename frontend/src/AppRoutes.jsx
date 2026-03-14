import React from "react";
import { createBrowserRouter } from "react-router-dom";

import MainLayouts from "./MainLayouts";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    children: [
      {
        index: true,
        // element: <HomePage />,
        element: <LoginPage />
      },
      {
        path:"/user/dashboard",
        element: <UserDashboard />
      },
      {
        path:"admin/dashboard",
        element: <AdminDashboard />
      },
      {
        path: "books",
        // element: <Books />,
      },
      {
        path: "issued-books",
        // element: <IssuedBooks />,
      },
    ],
  },
]);

export default router;