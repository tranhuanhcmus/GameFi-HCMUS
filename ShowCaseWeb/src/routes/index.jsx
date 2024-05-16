import ErrorPage from "pages/Error/Error";
import HomePage from "pages/Home/Home";
import MarketPlace from "pages/MarketPlace/MarketPlace";
import Resource from "pages/Resource/Resource";
import {
	createBrowserRouter,
  } from "react-router-dom";

const router = createBrowserRouter([
	{
	  path: "/",
	  element: <HomePage/>,
	},
	{
	  path: "/market-place",
	  element: <MarketPlace/>,
	},
	{
	  path: "/resource",
	  element: <Resource/>,
	},
	{
	  path: "*",
	  element: <ErrorPage/>,
	},
  ]);

export default router