import { ITask } from '../../../models/ITask';
import { SetUserAction, UserActionsEnum } from '../user/types';

export interface TaskState {
  tasks: ITask[];
}

export enum TaskActionsEnum {
  SET_TASKS = 'SET_TASKS',
  ADD_TASK = 'ADD_TASK',
  CHANGE_TASK = 'CHANGE_TASK',
  REMOVE_TASK = 'REMOVE_TASK',
}

export interface SetTasksAction {
  type: TaskActionsEnum.SET_TASKS;
  payload: ITask[];
}

export interface AddTaskAction {
  type: TaskActionsEnum.ADD_TASK;
  payload: ITask;
}

export interface ChangeTaskAction {
  type: TaskActionsEnum.CHANGE_TASK;
  payload: ITask;
}

export interface RemoveTaskAction {
  type: TaskActionsEnum.REMOVE_TASK;
  payload: string;
}

export type TaskAction = SetTasksAction | AddTaskAction | ChangeTaskAction | RemoveTaskAction;
