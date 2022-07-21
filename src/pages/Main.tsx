import React, { FC } from 'react';
import Calendar from '../components/Calendar/Calendar';
import TaskSet from '../components/TaskSet/TaskSet';

const Main: FC = () => {
  return (
    <div>
      <Calendar />
      <TaskSet />
    </div>
  );
};

export default Main;
