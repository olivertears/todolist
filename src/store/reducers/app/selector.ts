import { RootState } from '../../index';
import { AppState } from './types';

export const appSelector = (state: RootState): AppState => state.app;
