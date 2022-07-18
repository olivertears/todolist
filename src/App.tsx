import React from 'react';
import Navbar from './components/Navbar/Navbar';
import AppRouter from './components/AppRouter';
import AppLoader from './components/AppLoader/AppLoader';
import { useTypedSelector } from './hooks/useTypedSelector';

function App() {
  const { loader } = useTypedSelector((state) => state.app);

  return (
    <>
      <Navbar />
      {loader ? <AppLoader /> : <AppRouter />}
    </>
  );
}

export default App;
