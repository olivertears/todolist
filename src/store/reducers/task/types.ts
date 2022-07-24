import { ITask } from '../../../models/ITask';

export interface TaskState {
  tasks: ITask[];
  selectedTask: ITask;
}

export enum TaskActionsEnum {
  SET_TASKS = 'SET_TASKS',
  ADD_TASK = 'ADD_TASK',
  CHANGE_TASK = 'CHANGE_TASK',
  REMOVE_TASK = 'REMOVE_TASK',
  SET_SELECTED_TASK = 'SET_SELECTED_TASK',
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

export interface SetSelectedTaskAction {
  type: TaskActionsEnum.SET_SELECTED_TASK;
  payload: ITask;
}

export type TaskAction = SetTasksAction | AddTaskAction | ChangeTaskAction | RemoveTaskAction | SetSelectedTaskAction;
