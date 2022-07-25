import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { privateRoutes, publicRoutes } from '../router';
import SignIn from '../pages/SignIn';
import Main from '../pages/Main';

const AppRouter: FC = () => {
  const auth = getAuth();
  const [user] = useAuthState(auth);

  return user ? (
    <Routes>
      {privateRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={<route.element />} />
      ))}
      <Route path="*" element={<Main />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={<route.element />} />
      ))}
      <Route path="*" element={<SignIn />} />
    </Routes>
  );
};

export default AppRouter;
