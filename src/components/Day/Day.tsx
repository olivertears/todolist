import React, { FC } from 'react';
import cl from './Day.module.scss';

const Day: FC = () => {
  return (
    <div className={cl.wrap}>
      <div className={`${cl.wrap__card} ${cl.wrap__selected} ${cl.wrap__today}`}>
        <h3 className={cl.wrap__card__weekDay}>Wed</h3>
        <h2 className={cl.wrap__card__day}>30</h2>
      </div>
      <div className={cl.wrap__dots}>
        <div className={cl.wrap__dots__completedTask} />
        <div className={cl.wrap__dots__notCompletedTask} />
      </div>
    </div>
  );
};

export default Day;
