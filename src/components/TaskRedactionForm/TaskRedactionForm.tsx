import React, { ChangeEvent, FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import cl from './TaskRedactionForm.module.scss';
import { appSelector } from '../../store/reducers/app/selector';
import { RouteNames } from '../../router/RouteNames';
import { postTask, putTask } from '../../store/reducers/task/action-creators';
import { ITask } from '../../models/ITask';
import { userSelector } from '../../store/reducers/user/selector';
import { useThunkDispatch } from '../../hooks/useThunkDispatch';
import { taskSelector } from '../../store/reducers/task/selector';

const TaskRedactionForm: FC = () => {
  const { selectedDate } = useSelector(appSelector);
  const user = useSelector(userSelector);
  const { selectedTask } = useSelector(taskSelector);
  const dispatch = useThunkDispatch();
  const navigate = useNavigate();

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
    dispatch(putTask(user.uid, changedTask));
    navigate(RouteNames.MAIN);
  };

  const addTask = () => {
    const newTask: ITask = {
      uid: '',
      task,
      description,
      date,
      done: false,
    };
    dispatch(postTask(user.uid, newTask));
    navigate(RouteNames.MAIN);
  };

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
        className={cl.wrap__input}
        type={'date'}
        value={date}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
      />
      <div className={cl.wrap__buttonWrap}>
        <button className={cl.wrap__buttonWrap__btn} type={'submit'}>
          {selectedTask.uid ? 'Update' : 'Create'}
        </button>
        <Link to={RouteNames.MAIN}>
          <button className={cl.wrap__buttonWrap__btn}>Back</button>
        </Link>
      </div>
    </form>
  );
};

export default TaskRedactionForm;
