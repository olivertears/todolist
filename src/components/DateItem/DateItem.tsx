import React, { FC, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import cl from './DateItem.module.scss';
import { appSelector } from '../../store/reducers/app/selector';
import { setSelectedDate } from '../../store/reducers/app/action-creators';
import { taskSelector } from '../../store/reducers/task/selector';
import { weekDays } from '../../consts';
import { dateToString } from '../../utils/dateToString';

interface IDateItemProps {
  date: string;
}

const DateItem: FC<IDateItemProps> = ({ date }) => {
  const { selectedDate } = useSelector(appSelector);
  const { tasks } = useSelector(taskSelector);
  const dispatch = useDispatch();

  const [finishedTasks, setFinishedTasks] = useState<boolean>(false);
  const [unfinishedTasks, setUnfinishedTasks] = useState<boolean>(false);

  const thisDateTasks = useMemo(() => {
    return tasks.filter((task) => task.date === date);
  }, [tasks, date]);

  useEffect(() => {
    setFinishedTasks(!!thisDateTasks.find((task) => task.done === true));
    setUnfinishedTasks(!!thisDateTasks.find((task) => task.done === false));
  }, [thisDateTasks]);

  const selectDate = () => dispatch(setSelectedDate(date));

  return (
    <div className={cl.wrap}>
      <div
        className={clsx(cl.wrap__card, {
          [cl.wrap__past]: date < dateToString(new Date().getTime()),
          [cl.wrap__selected]: date === selectedDate,
          [cl.wrap__today]: date === dateToString(new Date().getTime()),
        })}
        onClick={selectDate}
      >
        <h3 className={cl.wrap__card__weekDay}>{weekDays[new Date(date).getDay()]}</h3>
        <h2 className={cl.wrap__card__day}>{new Date(date).getDate()}</h2>
      </div>
      <div className={cl.wrap__dots}>
        {finishedTasks && <div className={cl.wrap__dots__completedTask} />}
        {unfinishedTasks && <div className={cl.wrap__dots__notCompletedTask} />}
      </div>
    </div>
  );
};

export default DateItem;
