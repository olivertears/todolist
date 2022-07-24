import React, { FC, useState } from 'react';
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md';
import { IoIosArrowDown } from 'react-icons/io';
import { BsFillPencilFill } from 'react-icons/bs';
import { GoTrashcan } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cl from './Task.module.scss';
import { ITask } from '../../models/ITask';
import { deleteTask, putTask, setSelectedTask } from '../../store/reducers/task/action-creators';
import { RouteNames } from '../../router/RouteNames';
import { userSelector } from '../../store/reducers/user/selector';
import { useThunkDispatch } from '../../hooks/useThunkDispatch';

interface ITaskProps {
  task: ITask;
}

const Task: FC<ITaskProps> = ({ task }) => {
  const user = useSelector(userSelector);
  const dispatch = useThunkDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(task.done);

  const changeTask = () => {
    setDone(!done);
    dispatch(putTask(user.uid, { ...task, done: !done }));
    navigate(RouteNames.MAIN);
  };

  const goToTaskRedaction = () => {
    dispatch(setSelectedTask(task));
    navigate(RouteNames.TASK_REDACTION);
  };

  const removeTask = () => {
    dispatch(deleteTask(user.uid, task.uid));
  };

  return (
    <div className={cl.wrap}>
      <div className={cl.wrap__line}>
        {task.done ? (
          <MdCheckBox className={cl.wrap__line__checkbox} onClick={changeTask} />
        ) : (
          <MdCheckBoxOutlineBlank className={cl.wrap__line__checkbox} onClick={changeTask} />
        )}
        <h2 className={cl.wrap__line__txt}>{task.task}</h2>
      </div>
      <div className={cl.wrap__line}>
        {!!task.description && (
          <IoIosArrowDown
            className={`${cl.wrap__line__icon} ${open && cl.wrap__line__iconRotate}`}
            onClick={() => setOpen(!open)}
          />
        )}
        <BsFillPencilFill className={cl.wrap__line__icon} onClick={goToTaskRedaction} />
        <GoTrashcan className={cl.wrap__line__icon} onClick={removeTask} />
      </div>
      {open && <textarea className={cl.wrap__description}>{task.description}</textarea>}
    </div>
  );
};

export default Task;
