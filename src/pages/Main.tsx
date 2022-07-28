import React, { FC, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSelector } from 'react-redux';
import Calendar from '../components/Calendar/Calendar';
import TaskSet from '../components/TaskSet/TaskSet';
import { getTasks } from '../store/reducers/task/action-creators';
import { useThunkDispatch } from '../hooks/useThunkDispatch';
import { appSelector } from '../store/reducers/app/selector';
import { setFirstLogin } from '../store/reducers/app/action-creators';

const Main: FC = () => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const dispatch = useThunkDispatch();
  const { dateArray, firstLogin } = useSelector(appSelector);

  useEffect(() => {
    if (user && firstLogin) {
      dispatch(getTasks(user.uid, dateArray[0], dateArray[29]));
      dispatch(setFirstLogin(false));
    }
  }, [user]);

  return (
    <>
      <Calendar />
      <TaskSet />
    </>
  );
};

export default Main;
