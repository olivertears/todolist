import React, { FC, useState } from 'react';
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md';
import { IoIosArrowDown } from 'react-icons/io';
import { BsFillPencilFill } from 'react-icons/bs';
import { GoTrashcan } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import clsx from 'clsx';
import cl from './Task.module.scss';
import { ITask } from '../../models/ITask';
import { deleteTask, putTask, setSelectedTask } from '../../store/reducers/task/action-creators';
import { RouteNames } from '../../router/RouteNames';
import { useThunkDispatch } from '../../hooks/useThunkDispatch';

interface ITaskProps {
  task: ITask;
}

const Task: FC<ITaskProps> = ({ task }) => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const dispatch = useThunkDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(task.done);

  const changeTaskDone = () => {
    setDone(!done);
    dispatch(putTask(user?.uid || '', { ...task, done: !done }));
  };

  const goToTaskRedaction = () => {
    dispatch(setSelectedTask(task));
    navigate(RouteNames.TASK_REDACTION);
  };

  const changeDescriptionOpen = () => setOpen(!open);

  const removeTask = () => {
    dispatch(deleteTask(user?.uid || '', task.uid));
  };

  return (
    <div className={cl.wrap}>
      <div className={cl.wrap__line}>
        {task.done ? (
          <MdCheckBox className={cl.wrap__line__checkbox} onClick={changeTaskDone} />
        ) : (
          <MdCheckBoxOutlineBlank className={cl.wrap__line__checkbox} onClick={changeTaskDone} />
        )}
        <h2 className={cl.wrap__line__txt}>{task.task}</h2>
      </div>
      <div className={cl.wrap__line}>
        {!!task.description && (
          <IoIosArrowDown
            className={clsx(cl.wrap__line__icon, {
              [cl.wrap__line__iconRotate]: open,
            })}
            onClick={changeDescriptionOpen}
          />
        )}
        <BsFillPencilFill className={cl.wrap__line__icon} onClick={goToTaskRedaction} />
        <GoTrashcan className={cl.wrap__line__icon} onClick={removeTask} />
      </div>
      {open && <textarea className={cl.wrap__description} value={task.description} readOnly />}
    </div>
  );
};

export default Task;
