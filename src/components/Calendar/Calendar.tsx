import React, { FC } from 'react';
import cl from './Calendar.module.scss';
import Day from '../Day/Day';

const Calendar: FC = () => {
  const a = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className={cl.wrap}>
      {a.map((day) => (
        <Day key={day} />
      ))}
    </div>
  );
};

export default Calendar;
