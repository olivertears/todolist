import React, { FC, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../router';
import SignIn from '../pages/SignIn';
import Calendar from '../pages/Calendar';
import { useTypedSelector } from '../hooks/useTypedSelector';

const AppRouter: FC = () => {
  const { auth } = useTypedSelector((state) => state.user);

  return auth ? (
    <Routes>
      {privateRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={<route.element />} />
      ))}
      <Route path="*" element={<Calendar />} />
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
