import React, { FC, useState } from 'react';
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { BsFillPencilFill } from 'react-icons/bs';
import { GoTrashcan } from 'react-icons/go';
import cl from './Task.module.scss';

const Task: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const check = true;
  const description = 'some notes about task';

  return (
    <div className={cl.wrap}>
      <div className={cl.wrap__line}>
        {check ? (
          <MdCheckBox className={cl.wrap__line__checkbox} />
        ) : (
          <MdCheckBoxOutlineBlank className={cl.wrap__line__checkbox} />
        )}
        <h2 className={cl.wrap__line__txt}>Task</h2>
      </div>
      <div className={cl.wrap__line}>
        {open ? (
          <IoIosArrowUp className={cl.wrap__line__icon} onClick={() => setOpen(!open)} />
        ) : (
          <IoIosArrowDown className={cl.wrap__line__icon} onClick={() => setOpen(!open)} />
        )}
        <BsFillPencilFill className={cl.wrap__line__icon} />
        <GoTrashcan className={cl.wrap__line__icon} />
      </div>
      {!!description && open && <h3 className={cl.wrap__description}>{description}</h3>}
    </div>
  );
};

export default Task;
