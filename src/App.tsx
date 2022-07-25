import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Navbar from './components/Navbar/Navbar';
import AppRouter from './components/AppRouter';
import ErrorToast from './components/ErrorToast/ErrorToast';
import { appSelector } from './store/reducers/app/selector';
import { useThunkDispatch } from './hooks/useThunkDispatch';
import { setUser } from './store/reducers/user/action-creators';
import { IUser } from './models/IUser';
import { getTasks } from './store/reducers/task/action-creators';
import { userSelector } from './store/reducers/user/selector';

function App() {
  const auth = getAuth();
  const dispatch = useThunkDispatch();

  const { dateArray } = useSelector(appSelector);
  const { errors } = useSelector(appSelector);
  const user = useSelector(userSelector);

  onAuthStateChanged(auth, (u) => {
    if (u) {
      // dispatch(setUser(u as IUser));
    }
  });

  useEffect(() => {
    if (user.uid) {
      dispatch(getTasks(user.uid, dateArray[dateArray.length - 30], dateArray[dateArray.length - 1]));
    }
  }, [user]);

  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
      {!!errors.length && <ErrorToast />}
    </BrowserRouter>
  );
}

export default App;
