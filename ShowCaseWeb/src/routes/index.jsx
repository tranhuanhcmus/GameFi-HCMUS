import ErrorPage from "pages/Error/Error";
import Home from "pages/Home/Home";
import Layout from "pages/Layout/Layout";
import MarketPlace from "pages/MarketPlace/MarketPlace";
import Resource from "pages/Resource/Resource";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "market-place",
        element: <MarketPlace />,
      },
      {
        path: "resource",
        element: <Resource />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

export default router;
