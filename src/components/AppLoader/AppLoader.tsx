import React, { FC } from 'react';
// @ts-ignore
import cl from './AppLoader.module.scss';

const AppLoader: FC = () => {
  return (
    <div className={cl.spinner}>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default AppLoader;
