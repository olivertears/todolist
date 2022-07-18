import { ITask } from '../../../models/ITask';
import { TaskAction, TaskActionsEnum, TaskState } from './types';

const initialState: TaskState = {
  tasks: [] as ITask[],
};

export default function (state = initialState, action: TaskAction): TaskState {
  switch (action.type) {
    case TaskActionsEnum.SET_TASKS:
      return { ...state, tasks: action.payload };
    case TaskActionsEnum.ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] };
    case TaskActionsEnum.CHANGE_TASK:
      return { ...state, tasks: state.tasks.map((task) => (task.id === action.payload.id ? action.payload : task)) };
    case TaskActionsEnum.REMOVE_TASK:
      return { ...state, tasks: state.tasks.filter((task) => task.id !== action.payload) };
    default:
      return state;
  }
}
