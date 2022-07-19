import React, { FC, useEffect } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
// @ts-ignore
import cl from './ErrorToast.module.scss';

const ErrorToast: FC = () => {
  const { error } = useTypedSelector((state) => state.app);
  const { setError } = useActions();

  useEffect(() => {
    error &&
      setTimeout(() => {
        setError('');
      }, 3000);
  }, [error]);

  return (
    <div className={cl.wrap}>
      <h2 className={cl.wrap__txt}>{error}</h2>
    </div>
  );
};

export default ErrorToast;
