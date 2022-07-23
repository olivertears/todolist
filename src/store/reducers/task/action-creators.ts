import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { ITask } from '../../../models/ITask';
import {
  AddTaskAction,
  ChangeTaskAction,
  RemoveTaskAction,
  SetSelectedTaskAction,
  SetTasksAction,
  TaskActionsEnum,
} from './types';
import { AppDispatch } from '../../index';
import { addError, setLoader } from '../app/action-creators';
import { db } from '../../../firebaseInit';

export const setTasks = (tasks: ITask[]): SetTasksAction => ({
  type: TaskActionsEnum.SET_TASKS,
  payload: tasks,
});

export const addTask = (task: ITask): AddTaskAction => ({
  type: TaskActionsEnum.ADD_TASK,
  payload: task,
});

export const changeTask = (task: ITask): ChangeTaskAction => ({
  type: TaskActionsEnum.CHANGE_TASK,
  payload: task,
});

export const removeTask = (taskId: string): RemoveTaskAction => ({
  type: TaskActionsEnum.REMOVE_TASK,
  payload: taskId,
});

export const setSelectedTask = (task: ITask): SetSelectedTaskAction => ({
  type: TaskActionsEnum.SET_SELECTED_TASK,
  payload: task,
});

// THUNK ACTIONS

export const getTasks = (userId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoader(true));
    const res = await getDocs(collection(db, `users/${userId}/tasks`));
    const tasks = res.docs.map((d) => d.data() as ITask);
    dispatch(setTasks(tasks));
  } catch (e: any) {
    dispatch(addError(`Something went wrong, can't load your tasks :(`));
  } finally {
    dispatch(setLoader(false));
  }
};

export const postTask = (userId: string, task: ITask) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoader(true));
    const res = await addDoc(collection(db, `users/${userId}/tasks`), task);
    await updateDoc(doc(db, `users/${userId}/tasks`, res.id), { uid: res.id });
    dispatch(addTask({ ...task, uid: res.id }));
  } catch (e: any) {
    dispatch(addError('Something went wrong, please try again later :('));
  } finally {
    dispatch(setLoader(false));
  }
};

export const putTask = (userId: string, task: ITask) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoader(true));
    await updateDoc(doc(db, `users/${userId}/tasks`, task.uid), { ...task });
    dispatch(changeTask(task));
    dispatch(setSelectedTask({} as ITask));
  } catch (e: any) {
    dispatch(addError('Something went wrong, please try again later :('));
  } finally {
    dispatch(setLoader(false));
  }
};

export const deleteTask = (userId: string, taskId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoader(true));
    await deleteDoc(doc(db, `users/${userId}/tasks`, taskId));
    dispatch(removeTask(taskId));
  } catch (e: any) {
    dispatch(addError('Something went wrong, please try again later :('));
  } finally {
    dispatch(setLoader(false));
  }
};
