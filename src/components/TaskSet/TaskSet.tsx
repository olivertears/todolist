import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cl from './TaskSet.module.scss';
import Task from '../Task/Task';
import { RouteNames } from '../../router/RouteNames';
import { appSelector } from '../../store/reducers/app/selector';

const TaskSet: FC = () => {
  const { selectedDate } = useSelector(appSelector);

  const a = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className={cl.wrap}>
      <h4 className={cl.wrap__date}>
        {`${selectedDate.month} ${selectedDate.day}, ${selectedDate.year}`}
        <Link to={RouteNames.TASK_REDACTION} className={cl.wrap__date__newTask}>
          +
        </Link>
      </h4>
      <div className={cl.wrap__taskList}>
        {a.map((task) => (
          <Task key={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskSet;
