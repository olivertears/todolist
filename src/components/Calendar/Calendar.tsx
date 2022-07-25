import React, { FC, LegacyRef, useEffect, useLayoutEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useInView } from 'react-hook-inview';
import cl from './Calendar.module.scss';
import { appSelector } from '../../store/reducers/app/selector';
import DateItem from '../DateItem/DateItem';
import { useThunkDispatch } from '../../hooks/useThunkDispatch';
import { userSelector } from '../../store/reducers/user/selector';
import { addDatesToEnd, addDatesToStart } from '../../store/reducers/app/action-creators';
import { getDatesToEnd } from '../../utils/getDatesToEnd';
import { getDatesToStart } from '../../utils/getDatesToStart';
import { getTasks } from '../../store/reducers/task/action-creators';

let start = 0;
let transform = -100;

const Calendar: FC = () => {
  const slide = useRef<HTMLDivElement>(null);
  const { dateArray } = useSelector(appSelector);
  const user = useSelector(userSelector);
  const dispatch = useThunkDispatch();

  const [refEnd, inViewEnd] = useInView();
  const [refStart, inViewStart] = useInView();

  const firstRender = useRef<boolean>(true);

  useLayoutEffect(() => {
    if (slide.current) {
      slide.current.style.transform = `translateX(${transform}px)`;
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

  useEffect(() => {
    if (inViewStart) {
      start += window.innerWidth < 768 ? 30 * 84 : 30 * 100;
      dispatch(addDatesToStart(getDatesToStart(dateArray[0])));
    } else {
      firstRender.current || dispatch(getTasks(user.uid, dateArray[0], dateArray[29]));
    }
  }, [inViewStart]);

  useEffect(() => {
    if (inViewEnd) {
      dispatch(addDatesToEnd(getDatesToEnd(dateArray[dateArray.length - 1])));
    } else {
      firstRender.current
        ? (firstRender.current = false)
        : dispatch(getTasks(user.uid, dateArray[dateArray.length - 30], dateArray[dateArray.length - 1]));
    }
  }, [inViewEnd]);

  const getRef = (idx: number): LegacyRef<HTMLDivElement> | null => {
    if (idx === dateArray.length - 1) {
      return refEnd;
    }
    if (idx === 0) {
      return refStart;
    }
    return null;
  };

  return (
    <div className={cl.wrap}>
      <div ref={slide} className={cl.wrap__slider} draggable={false}>
        {dateArray.map((date, idx) => (
          <div key={date} ref={getRef(idx)}>
            <DateItem date={date} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
