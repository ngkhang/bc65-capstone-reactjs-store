import { createBrowserRouter, Navigate } from 'react-router-dom';
import { DefaultTemplate, AuthTemplate, UserTemplate } from '../template';
import { Home, Products, DetailProduct, Auth, ErrorPage } from '../pages';
import Profile from '../pages/Profile/Profile';
import Cart from '../pages/Cart/Cart';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultTemplate />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'products',
        children: [
          {
            index: true,
            element: <Products />,
          },
          {
            path: ':productSlug/:productId',
            element: <DetailProduct />,
          },
        ],
      },
      {
        path: 'cart',
        children: [
          {
            index: true,
            element: <Cart />,
          },
        ],
      },
    ],
  },
  {
    path: 'user',
    element: <UserTemplate />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'account/profile',
        element: <Profile />,
      },
    ],
  },
  {
    path: 'auth',
    element: <AuthTemplate />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/auth/signin" />,
      },
      {
        path: ':action',
        element: <Auth />,
      },
    ],
  },
]);

export default router;
