import React, { FC } from 'react';
// @ts-ignore
import cl from './Loader.module.scss';

const Loader: FC = () => {
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

export default Loader;
