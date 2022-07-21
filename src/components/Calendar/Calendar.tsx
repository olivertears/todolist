import React, { FC, useLayoutEffect, useRef, useState } from 'react';
import cl from './Calendar.module.scss';
import Day from '../Day/Day';

const Calendar: FC = () => {
  const slide = useRef<HTMLDivElement>(null);

  const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];

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
        {a.map((day) => (
          <Day key={day} />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
