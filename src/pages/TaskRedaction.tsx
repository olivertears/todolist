import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { appSelector } from '../store/reducers/app/selector';
import Loader from '../components/Loader/Loader';
import TaskRedactionForm from '../components/TaskRedactionForm/TaskRedactionForm';

const TaskRedaction: FC = () => {
  const { loader } = useSelector(appSelector);

  return loader ? <Loader /> : <TaskRedactionForm />;
};

export default TaskRedaction;
