import React from 'react';
import Navbar from './components/Navbar/Navbar';
import AppRouter from './components/AppRouter';
import Loader from './components/Loader/Loader';
import { useTypedSelector } from './hooks/useTypedSelector';

function App() {
  const { loader } = useTypedSelector((state) => state.app);

  return (
    <>
      <Navbar />
      {loader ? <Loader /> : <AppRouter />}
    </>
  );
}

export default App;
