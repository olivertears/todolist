import React, { FC, useLayoutEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import cl from './Calendar.module.scss';
import { appSelector } from '../../store/reducers/app/selector';
import DateItem from '../DateItem/DateItem';

const Calendar: FC = () => {
  const slide = useRef<HTMLDivElement>(null);
  const { dateArray } = useSelector(appSelector);

  let start = 0;
  let transform = 0;

  useLayoutEffect(() => {
    if (slide.current) {
      slide.current.addEventListener('mousedown', swipeStart);
    }
  }, []);

  const swipeStart = (e: MouseEvent) => {
    start = e.x;

    document.addEventListener('mousemove', swipeAction);
    document.addEventListener('mouseup', swipeEnd);
  };

  const swipeAction = (e: MouseEvent) => {
    transform += e.x - start;
    start = e.x;

    if (slide.current !== null) {
      slide.current.style.transform = `translateX(${transform}px)`;
    }
  };

  const swipeEnd = (e: MouseEvent) => {
    document.removeEventListener('mousemove', swipeAction);
    document.removeEventListener('mouseup', swipeEnd);
  };

  return (
    <div className={cl.wrap}>
      <div ref={slide} className={cl.wrap__slider} draggable={false}>
        {dateArray.map((date) => (
          <DateItem key={String(date)} date={date} />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
