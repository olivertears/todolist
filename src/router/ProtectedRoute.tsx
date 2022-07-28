import React, { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import { RouteNames } from './AppRouter.types';

interface IProtectedRouteProps {
  loading: boolean;
  guard: boolean;
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({ loading, guard }) => {
  if (loading) {
    return <Loader />;
  }

  if (!guard) {
    return <Navigate to={RouteNames.NOT_FOUND} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
