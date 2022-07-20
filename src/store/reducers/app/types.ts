export interface AppState {
  loader: boolean;
  errors: string[];
}

export enum AppActionsEnum {
  SET_LOADER = 'SET_LOADER',
  ADD_ERROR = 'ADD_ERROR',
  REMOVE_ERROR = 'REMOVE_ERROR',
}

export interface SetLoaderAction {
  type: AppActionsEnum.SET_LOADER;
  payload: boolean;
}

export interface AddErrorAction {
  type: AppActionsEnum.ADD_ERROR;
  payload: string;
}

export interface RemoveErrorAction {
  type: AppActionsEnum.REMOVE_ERROR;
}

export type AppAction = SetLoaderAction | AddErrorAction | RemoveErrorAction;
