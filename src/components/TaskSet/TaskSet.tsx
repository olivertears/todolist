import React, { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cl from './TaskSet.module.scss';
import Task from '../Task/Task';
import { RouteNames } from '../../router/AppRouter.types';
import { appSelector } from '../../store/reducers/app/selector';
import { taskSelector } from '../../store/reducers/task/selector';
import { months } from '../../consts';
import Loader from '../Loader/Loader';

const TaskSet: FC = () => {
  const { selectedDate, loader } = useSelector(appSelector);
  const { tasks } = useSelector(taskSelector);

  const date = `${months[new Date(selectedDate).getMonth()]} ${new Date(selectedDate).getDate()}, 
  ${new Date(selectedDate).getFullYear()}`;

  const todayTasks = useMemo(() => {
    return tasks.filter((task) => task.date === selectedDate);
  }, [tasks, selectedDate]);

  return (
    <div className={cl.wrap}>
      <h4 className={cl.wrap__date}>
        {date}
        <Link to={RouteNames.TASK_REDACTION} className={cl.wrap__date__newTask}>
          +
        </Link>
      </h4>
      {loader ? (
        <Loader />
      ) : (
        <div className={cl.wrap__taskList}>
          {todayTasks.map((task) => (
            <Task key={task.uid} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskSet;
