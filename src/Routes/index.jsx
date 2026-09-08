/* eslint-disable react-refresh/only-export-components -- this is a route table,
   not a component module: it intentionally exports `router` and declares lazy
   route references, so the Fast Refresh "only export components" rule does not
   apply here. */
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import Layout from "../components/Layout/Layout";
// The homepage is the above-the-fold landing view, so it stays in the initial
// bundle (eager) to protect LCP — everything else below is code-split.
import HomeContent from "./../components/Tabs/tabs-content/HomeContent/HomeContent";

// Route guards are tiny and used on every route; keep them eager.
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import AdminRoute from "../components/ProtectedRoute/AdminRoute";
import PublicOnlyRoute from "../components/ProtectedRoute/PublicOnlyRoute";

// Lazily loaded routes. Each becomes its own chunk, so heavy, rarely-used
// pages (admin dashboard + @mui/x-data-grid, formik/yup forms, etc.) are no
// longer downloaded as part of the first paint. A single <Suspense> boundary
// in Layout renders the fallback while these chunks load.
const BarsList = lazy(() => import("./../components/Tabs/tabs-content/bars/BarsList"));
const NewJewelry = lazy(() => import("./../components/Tabs/tabs-content/jewelry/NewJewelry"));
const UsedJewelry = lazy(() => import("./../components/Tabs/tabs-content/jewelry/UsedJewelry"));
const SilverBars = lazy(() => import("./../components/Tabs/tabs-content/silver/SilverBars"));
const SilverPrices = lazy(() => import("./../components/Tabs/tabs-content/silver/SilverPrices"));
const SilverProducts = lazy(() => import("./../components/Tabs/tabs-content/silver/SilverProducts"));
const AuthPage = lazy(() => import("./../components/AuthPage/AuthPage"));
const Dashboard = lazy(() => import("./../components/Dashboard/Dashboard"));
const CreateProduct = lazy(() => import("../components/Dashboard/products/CreateProduct"));
const Products = lazy(() => import("./../components/Dashboard/products/Products"));
const UsersPage = lazy(() => import("./../components/Dashboard/users/UsersPage"));
const EditProduct = lazy(() => import("./../components/Dashboard/products/EditProduct"));
const NotFound = lazy(() => import("../components/NotFound/NotFound"));
// Public legal pages — no auth required.
const TermsPage = lazy(() => import("../components/Legal/TermsPage"));
const PrivacyPage = lazy(() => import("../components/Legal/PrivacyPage"));
// Public account-deletion page (Google Play requires it to open without login);
// the DELETE request it performs still requires the access token.
const DeleteAccountPage = lazy(() => import("../components/Account/DeleteAccountPage"));

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
      {path:"login", element:<PublicOnlyRoute><AuthPage/></PublicOnlyRoute>},
      // Public legal pages (no login required).
      {path:"terms", element: <TermsPage/>},
      {path:"privacy", element: <PrivacyPage/>},
      {path:"delete-account", element: <DeleteAccountPage/>},
      {path:"dashboard", element: <AdminRoute> <Dashboard/> </AdminRoute>   },
      {path:"create-product", element: <AdminRoute> <CreateProduct/> </AdminRoute> },
      {path:"products", element: <AdminRoute> <Products/> </AdminRoute> },
      {path:"users", element: <AdminRoute> <UsersPage/> </AdminRoute> },
      {path:"products/edit/:id", element: <AdminRoute><EditProduct/></AdminRoute>},
      {path:"*", element: <NotFound/>}

    ],
  },
]);
