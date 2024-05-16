import ErrorPage from "pages/ErrorPage/ErrorPage";
import HomePage from "pages/HomePage/HomePage";
import {
	createBrowserRouter,
  } from "react-router-dom";

const router = createBrowserRouter([
	{
	  path: "/",
	  element: <HomePage/>,
	},
	{
	  path: "*",
	  element: <ErrorPage/>,
	},
  ]);

export default router