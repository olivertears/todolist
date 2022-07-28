import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar/Navbar';
import AppRouter from './router/AppRouter';
import ErrorToast from './components/ErrorToast/ErrorToast';
import { appSelector } from './store/reducers/app/selector';

function App() {
  const { errors } = useSelector(appSelector);

  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
      {!!errors.length && <ErrorToast />}
    </BrowserRouter>
  );
}

export default App;
