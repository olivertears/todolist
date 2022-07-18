export interface AppState {
  loader: boolean;
  error: string;
}

export enum AppActionsEnum {
  SET_LOADER = 'SET_LOADER',
  SER_ERROR = 'SET_ERROR',
}

export interface SetLoaderAction {
  type: AppActionsEnum.SET_LOADER;
  payload: boolean;
}

export interface SetErrorAction {
  type: AppActionsEnum.SER_ERROR;
  payload: string;
}

export type AppAction = SetLoaderAction | SetErrorAction;
