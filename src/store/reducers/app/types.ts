export interface AppState {
  loader: boolean;
  errors: string[];
  dateArray: string[];
  selectedDate: string;
  firstLogin: boolean;
}

export enum AppActionsEnum {
  SET_LOADER = 'SET_LOADER',
  ADD_ERROR = 'ADD_ERROR',
  REMOVE_ERROR = 'REMOVE_ERROR',
  ADD_DATES_TO_START = 'ADD_DATES_TO_START',
  ADD_DATES_TO_END = 'ADD_DATES_TO_END',
  SET_SELECTED_DATE = 'SET_SELECTED_DATE',
  SET_FIRST_LOGIN = 'SET_FIRST_LOGIN',
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

export interface AddDatesToStartAction {
  type: AppActionsEnum.ADD_DATES_TO_START;
  payload: string[];
}

export interface AddDatesToEndAction {
  type: AppActionsEnum.ADD_DATES_TO_END;
  payload: string[];
}

export interface SetSelectedDateAction {
  type: AppActionsEnum.SET_SELECTED_DATE;
  payload: string;
}

export interface SetFirstLoginAction {
  type: AppActionsEnum.SET_FIRST_LOGIN;
  payload: boolean;
}

export type AppAction =
  | SetLoaderAction
  | AddErrorAction
  | RemoveErrorAction
  | AddDatesToStartAction
  | AddDatesToEndAction
  | SetSelectedDateAction
  | SetFirstLoginAction;
