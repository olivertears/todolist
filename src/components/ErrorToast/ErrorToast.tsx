import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cl from './ErrorToast.module.scss';
import { removeError } from '../../store/reducers/app/action-creators';
import { appSelector } from '../../store/reducers/app/selector';

const ErrorToast: FC = () => {
  const { errors } = useSelector(appSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(removeError());
    }, 3000);
  }, [errors, dispatch]);

  return (
    <div className={cl.wrap}>
      {errors.map((error, idx) => (
        <div key={error[idx]} className={cl.wrap__errorWrap}>
          <h2 className={cl.wrap__errorWrap__txt}>{error}</h2>
        </div>
      ))}
    </div>
  );
};

export default ErrorToast;
