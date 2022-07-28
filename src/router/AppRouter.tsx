import React, { FC, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loader from '../components/Loader/Loader';
import ProtectedRoute from './ProtectedRoute';
import { routes } from './index';
import NotFoundPage from '../pages/NotFoundPage';

const AppRouter: FC = () => {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} element={<ProtectedRoute loading={loading} guard={!!user === route.guard} />}>
            <Route path={route.path} element={<route.element />} />
          </Route>
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
