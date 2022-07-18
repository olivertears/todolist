import { ITask } from '../../../models/ITask';
import { AddTaskAction, ChangeTaskAction, RemoveTaskAction, SetTasksAction, TaskActionsEnum } from './types';

export const TaskActionCreators = {
  setTasks: (tasks: ITask[]): SetTasksAction => ({
    type: TaskActionsEnum.SET_TASKS,
    payload: tasks,
  }),
  addTask: (task: ITask): AddTaskAction => ({
    type: TaskActionsEnum.ADD_TASK,
    payload: task,
  }),
  changeTask: (task: ITask): ChangeTaskAction => ({
    type: TaskActionsEnum.CHANGE_TASK,
    payload: task,
  }),
  removeTask: (taskId: string): RemoveTaskAction => ({
    type: TaskActionsEnum.REMOVE_TASK,
    payload: taskId,
  }),
};
