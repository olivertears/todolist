import React, { FC, LegacyRef, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useInView } from 'react-hook-inview';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import cl from './Calendar.module.scss';
import { appSelector } from '../../store/reducers/app/selector';
import DateItem from '../DateItem/DateItem';
import { useThunkDispatch } from '../../hooks/useThunkDispatch';
import { addDatesToEnd, addDatesToStart } from '../../store/reducers/app/action-creators';
import { getDatesToEnd } from '../../utils/getDatesToEnd';
import { getDatesToStart } from '../../utils/getDatesToStart';
import { getTasks } from '../../store/reducers/task/action-creators';

let transform = window.innerWidth < 768 ? -94 : -110;
let startTouch: null | React.Touch = null;

const Calendar: FC = () => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const slide = useRef<HTMLDivElement>(null);
  const { dateArray } = useSelector(appSelector);
  const dispatch = useThunkDispatch();

  const [refEnd, inViewEnd] = useInView();
  const [refStart, inViewStart] = useInView();

  const firstRender = useRef<boolean>(true);

  useEffect(() => {
    if (inViewStart) {
      transform -= window.innerWidth < 768 ? 30 * 84 : 30 * 100;
      dispatch(addDatesToStart(getDatesToStart(dateArray[0])));
    } else {
      firstRender.current || dispatch(getTasks(user?.uid || '', dateArray[0], dateArray[29]));
    }
  }, [inViewStart]);

  useEffect(() => {
    if (inViewEnd) {
      dispatch(addDatesToEnd(getDatesToEnd(dateArray[dateArray.length - 1])));
    } else {
      firstRender.current
        ? (firstRender.current = false)
        : dispatch(getTasks(user?.uid || '', dateArray[dateArray.length - 30], dateArray[dateArray.length - 1]));
    }
  }, [inViewEnd]);

  const mouseMoveAction: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();

    if (e.buttons === 1 && slide.current) {
      transform += e.movementX;
      slide.current.style.transform = `translateX(${transform}px)`;
    }
  };

  const touchMoveAction: React.TouchEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();

    const currentTouch = e.touches[0];

    if (startTouch && slide.current) {
      transform -= startTouch.clientX - currentTouch.clientX;
      slide.current.style.transform = `translateX(${transform}px)`;
    }

    startTouch = currentTouch;
  };

  const touchEndAction = () => {
    startTouch = null;
  };

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
      <div
        ref={slide}
        onMouseMove={mouseMoveAction}
        onTouchMove={touchMoveAction}
        onTouchEnd={touchEndAction}
        className={cl.wrap__slider}
        draggable={false}
      >
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
