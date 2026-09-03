import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import HomeContent from './../components/Tabs/tabs-content/HomeContent/HomeContent';
import BarsList from './../components/Tabs/tabs-content/bars/BarsList';
import Coins from './../components/Tabs/tabs-content/bars/Coins';
import NewJewelry from './../components/Tabs/tabs-content/jewelry/NewJewelry';
import UsedJewelry from './../components/Tabs/tabs-content/jewelry/UsedJewelry';
import SilverBars from './../components/Tabs/tabs-content/silver/SilverBars';
import SilverPrices from './../components/Tabs/tabs-content/silver/SilverPrices';
import SilverProducts from './../components/Tabs/tabs-content/silver/SilverProducts';
import AuthPage from './../components/AuthPage/AuthPage';
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import Dashboard from './../components/Dashboard/Dashboard';
import AdminRoute from './../components/ProtectedRoute/AdminRoute';
import CreateProduct from "../components/Dashboard/products/CreateProduct";
import Products from './../components/Dashboard/products/Products';
import UsersPage from './../components/Dashboard/users/UsersPage';
import EditProduct from './../components/Dashboard/products/EditProduct';

export const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <ProtectedRoute> <HomeContent /> </ProtectedRoute>  },

      {
        path: "bars",
        children: [
          { path: "list", element: <ProtectedRoute> <BarsList /> </ProtectedRoute> },
          // { path: "coins", element: <ProtectedRoute> <Coins /> </ProtectedRoute>  },
        ],
      },

      {
        path: "jewelry",
        children: [
          { path: "new", element:<ProtectedRoute>  <NewJewelry /> </ProtectedRoute> },
          { path: "used", element: <ProtectedRoute>  <UsedJewelry /> </ProtectedRoute> },
        ],
      },

      {
        path: "silver",
        children: [
          { path: "bars", element: <ProtectedRoute> <SilverBars /> </ProtectedRoute>  },
          { path: "prices", element: <ProtectedRoute> <SilverPrices /> </ProtectedRoute>  },
          { path: "products", element: <ProtectedRoute> <SilverProducts /> </ProtectedRoute>  },
        ],
      },
      {path:"login", element:<AuthPage/>},
      {path:"dashboard", element: <AdminRoute> <Dashboard/> </AdminRoute>   },
      {path:"create-product", element: <AdminRoute> <CreateProduct/> </AdminRoute> },
      {path:"products", element: <AdminRoute> <Products/> </AdminRoute> },
      {path:"users", element: <AdminRoute> <UsersPage/> </AdminRoute> },
      {path:"products/edit/:id", element: <AdminRoute><EditProduct/></AdminRoute>}

    ],
  },
]);