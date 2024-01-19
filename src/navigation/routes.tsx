import Category from "../pages/Category";
import Home from "../pages/Home";

const routes = [
  {
    path: "*",
    element: <Home />
  },
  {
    path: "/",
    element: <Home />
  },
  {
    path: ":categoryName",
    element: <Category />
  }
];

export default routes;
