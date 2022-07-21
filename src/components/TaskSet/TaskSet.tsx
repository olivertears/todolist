import React, { FC } from 'react';
import cl from './TaskSet.module.scss';
import Task from '../Task/Task';

const TaskSet: FC = () => {
  const a = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className={cl.wrap}>
      <h4 className={cl.wrap__date}>
        Jul 21, 2022 <div className={cl.wrap__date__newTask}>+</div>
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
