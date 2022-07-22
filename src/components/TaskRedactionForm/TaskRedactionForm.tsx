import React, { FC } from 'react';
import cl from './TaskRedactionForm.module.scss';

const TaskRedactionForm: FC = () => {
  return (
    <div className={cl.wrap}>
      <h4 className={cl.wrap__title}>Task Redaction</h4>
      <input className={cl.wrap__input} placeholder={'Task'} />
      <textarea className={cl.wrap__input} placeholder={'Description'} />
      <input className={cl.wrap__input} type={'date'} />
      <div className={cl.wrap__buttonWrap}>
        <button className={cl.wrap__buttonWrap__btn}>Save</button>
        <button className={cl.wrap__buttonWrap__btn}>Back</button>
      </div>
    </div>
  );
};

export default TaskRedactionForm;
