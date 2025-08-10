import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Companies from "./components/admin/Companies";
import CreateCompany from "./components/admin/CreateCompany";
import CompanySetup from "./components/admin/CompanySetup";
import JobsAdmin from "./components/admin/JobsAdmin";
import PostJob from "./components/admin/PostJob";
import Applicants from "./components/admin/Applicants";
import EditJob from "./components/admin/EditJob";
import AdminProtectedRoute from "./components/admin/ProtectedRoutes";
import SaveForLater from "./components/SaveForLater";
import ProtectedRouteForUser from "./components/ProtectedRouteForUser";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRouteForUser>
        <Home />
      </ProtectedRouteForUser>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/jobs",
    element: (
      <ProtectedRouteForUser>
        <Jobs />
      </ProtectedRouteForUser>
    ),
  },
  {
    path: "/description/:id",
    element: (
      <ProtectedRouteForUser>
        <JobDescription />
      </ProtectedRouteForUser>
    ),
  },
  {
    path: "/browse",
    element: (
      <ProtectedRouteForUser>
        <Browse />
      </ProtectedRouteForUser>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRouteForUser>
        <Profile />
      </ProtectedRouteForUser>
    ),
  },
  {
    path: "/save-for-later",
    element: (
      <ProtectedRouteForUser>
        <SaveForLater />
      </ProtectedRouteForUser>
    ),
  },

  // ======== ADMIN ROUTES ======
  {
    path: "/admin/companies",
    element: (
      <AdminProtectedRoute>
        <Companies />
      </AdminProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/create",
    element: (
      <AdminProtectedRoute>
        <CreateCompany />
      </AdminProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/:id",
    element: (
      <AdminProtectedRoute>
        <CompanySetup />
      </AdminProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
      <AdminProtectedRoute>
        <JobsAdmin />
      </AdminProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/create",
    element: (
      <AdminProtectedRoute>
        <PostJob />
      </AdminProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <AdminProtectedRoute>
        <Applicants />
      </AdminProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/:id/edit",
    element: (
      <AdminProtectedRoute>
        <EditJob />
      </AdminProtectedRoute>
    ),
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
};

export default App;
