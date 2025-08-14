import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AppLayout from "./layouts/app-layout";
import Landing from "./pages/landing_page";
import Dashboard from "./pages/dashboard";
import Auth from "./pages/auth";
import Link from "./pages/link";
import RedirectLink from "./pages/redirect-link";
import UrlProvider from "./context";
import RequireAuth from "./components/require-auth";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/dashboard",
        element: (
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        ),
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/link/:id",
        element: (
          <RequireAuth>
            <Link />
          </RequireAuth>
        ),
      },
      {
        path: "/:id",
        element: <RedirectLink />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <UrlProvider>
        {/* <div className="text-center text-3xl">Wassup danger</div> */}
        <RouterProvider router={router} />
      </UrlProvider>
    </>
  );
}

export default App;
