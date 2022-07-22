import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cl from './DateItem.module.scss';
import { IDate } from '../../models/IDate';
import { appSelector } from '../../store/reducers/app/selector';
import { translateDateToIDate } from '../../utils/translateDateToIDate';
import { setSelectedDate } from '../../store/reducers/app/action-creators';

interface IDateItemProps {
  date: IDate;
}

const DateItem: FC<IDateItemProps> = ({ date }) => {
  const { selectedDate } = useSelector(appSelector);
  const dispatch = useDispatch();

  return (
    <div className={cl.wrap}>
      <div
        className={`${cl.wrap__card} ${JSON.stringify(selectedDate) === JSON.stringify(date) && cl.wrap__selected} ${
          JSON.stringify(date) === JSON.stringify(translateDateToIDate(new Date())) && cl.wrap__today
        }`}
        onClick={() => dispatch(setSelectedDate(date))}
      >
        <h3 className={cl.wrap__card__weekDay}>{date.weekDay}</h3>
        <h2 className={cl.wrap__card__day}>{date.day}</h2>
      </div>
      <div className={cl.wrap__dots}>
        <div className={cl.wrap__dots__completedTask} />
        <div className={cl.wrap__dots__notCompletedTask} />
      </div>
    </div>
  );
};

export default DateItem;
