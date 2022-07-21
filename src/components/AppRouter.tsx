import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { privateRoutes, publicRoutes } from '../router';
import SignIn from '../pages/SignIn';
import Main from '../pages/Main';
import { userSelector } from '../store/reducers/user/selector';

const AppRouter: FC = () => {
  const user = useSelector(userSelector);

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
