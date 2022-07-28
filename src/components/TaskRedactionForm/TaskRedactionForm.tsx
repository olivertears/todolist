import React, { ChangeEvent, FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import cl from './TaskRedactionForm.module.scss';
import { appSelector } from '../../store/reducers/app/selector';
import { RouteNames } from '../../router/AppRouter.types';
import { postTask, putTask, setSelectedTask } from '../../store/reducers/task/action-creators';
import { ITask } from '../../models/ITask';
import { useThunkDispatch } from '../../hooks/useThunkDispatch';
import { taskSelector } from '../../store/reducers/task/selector';
import { dateToString } from '../../utils/dateToString';

const TaskRedactionForm: FC = () => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const dispatch = useThunkDispatch();
  const navigate = useNavigate();

  const { selectedDate } = useSelector(appSelector);
  const { selectedTask } = useSelector(taskSelector);

  const [task, setTask] = useState<string>(selectedTask.task || '');
  const [description, setDescription] = useState<string>(selectedTask.description || '');
  const [date, setDate] = useState<string>(selectedDate);

  const redactTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    selectedTask.uid ? changeTask() : addTask();
  };

  const changeTask = () => {
    const changedTask: ITask = {
      uid: selectedTask.uid,
      task,
      description,
      date,
      done: false,
    };
    dispatch(putTask(user?.uid || '', changedTask)).then(() => navigate(RouteNames.MAIN));
  };

  const addTask = () => {
    const newTask: ITask = {
      uid: '',
      task,
      description,
      date,
      done: false,
    };
    dispatch(postTask(user?.uid || '', newTask)).then(() => navigate(RouteNames.MAIN));
  };

  const clearSelectedTask = () => dispatch(setSelectedTask({} as ITask));

  return (
    <form className={cl.wrap} onSubmit={redactTask}>
      <h4 className={cl.wrap__title}>Task Redaction</h4>
      <input
        required
        className={cl.wrap__input}
        placeholder={'Task'}
        value={task}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTask(e.target.value)}
      />
      <textarea
        className={cl.wrap__input}
        placeholder={'Description'}
        value={description}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
      />
      <input
        required
        className={cl.wrap__input}
        type={'date'}
        min={dateToString(new Date().getTime())}
        value={date}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
      />
      <div className={cl.wrap__buttonWrap}>
        <button className={cl.wrap__buttonWrap__btn} type={'submit'}>
          {selectedTask.uid ? 'Update' : 'Create'}
        </button>
        <Link to={RouteNames.MAIN}>
          <button className={cl.wrap__buttonWrap__btn} onClick={clearSelectedTask}>
            Back
          </button>
        </Link>
      </div>
    </form>
  );
};

export default TaskRedactionForm;
