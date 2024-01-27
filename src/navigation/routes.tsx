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
    path: "/categories/:categoryId",
    element: <Category />
  }
];

export default routes;
