import { createBrowserRouter, Navigate } from 'react-router-dom';
import { DefaultTemplate, UserAuthTemplate } from '../template';
import { Home, Products, DetailProduct, Auth, ErrorPage } from '../pages';

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
        path: 'account',
        children: [
          {
            path: ':user',
            // element: </>,
          },
          {
            path: 'profile',
            // element: </>,
          },
        ],
      },
    ],
  },
  {
    path: 'auth',
    element: <UserAuthTemplate />,
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
