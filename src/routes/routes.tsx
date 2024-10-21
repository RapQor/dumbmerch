import { RouteObject } from "react-router-dom";
import RootLayout from "../layout/root-layout";
import ComplainPage from "../pages/complain";
import ProfilePage from "../pages/profile";
import UserShop from "../pages/user-shop";
import AuthLayout from "../layout/auth-layout";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import AdminLayout from "../layout/admin-layout";
import CategoryPage from "../pages/category";
import AdminComplainPage from "../pages/admin-complain";
import ProductPage from "../pages/product";
import ProductDetailPage from "../pages/user-detail-product";
import EditCategory from "../pages/edit-category";
import EditProduct from "../pages/edit-product";

const routes: RouteObject[] = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <CategoryPage />,
      },
      {
        path: "complain",
        element: <AdminComplainPage />,
      },
      {
        path: "category",
        element: <CategoryPage />,
      },
      {
        path: "edit-category/:id",
        element: <EditCategory />,
      },
      {
        path: "product",
        element: <ProductPage />,
      },
      {
        path: "edit-product/:id",
        element: <EditProduct />,
      },
    ],
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <UserShop />,
      },
      {
        path: "complain",
        element: <ComplainPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "products/:id",
        element: <ProductDetailPage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
];

export default routes;
