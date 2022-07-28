import { RootState } from '../../index';
import { TaskState } from './types';

export const taskSelector = (state: RootState): TaskState => state.task;
