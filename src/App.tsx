import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import Navbar from './components/Navbar/Navbar';
import AppRouter from './components/AppRouter';
import ErrorToast from './components/ErrorToast/ErrorToast';
import { appSelector } from './store/reducers/app/selector';
import { useThunkDispatch } from './hooks/useThunkDispatch';
import { getTasks } from './store/reducers/task/action-creators';
import Loader from './components/Loader/Loader';

function App() {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const dispatch = useThunkDispatch();
  const { dateArray } = useSelector(appSelector);
  const { errors } = useSelector(appSelector);

  // onAuthStateChanged(auth, () => {
  //   user && dispatch(getTasks(user.uid, dateArray[0], dateArray[29]));
  // });

  useEffect(() => {
    user && dispatch(getTasks(user.uid, dateArray[0], dateArray[29]));
  }, [user]);

  return (
    <BrowserRouter>
      <Navbar />
      {loading ? <Loader /> : <AppRouter />}
      {!!errors.length && <ErrorToast />}
    </BrowserRouter>
  );
}

export default App;
