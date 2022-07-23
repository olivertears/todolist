import {
  AddDatesToEndAction,
  AddDatesToStartAction,
  AddErrorAction,
  AppActionsEnum,
  RemoveErrorAction,
  SetLoaderAction,
  SetSelectedDateAction,
} from './types';

export const setLoader = (loader: boolean): SetLoaderAction => ({
  type: AppActionsEnum.SET_LOADER,
  payload: loader,
});

export const addError = (error: string): AddErrorAction => ({
  type: AppActionsEnum.ADD_ERROR,
  payload: error,
});

export const removeError = (): RemoveErrorAction => ({
  type: AppActionsEnum.REMOVE_ERROR,
});

export const addDatesToStart = (dates: string[]): AddDatesToStartAction => ({
  type: AppActionsEnum.ADD_DATES_TO_START,
  payload: dates,
});

export const addDatesToEnd = (dates: string[]): AddDatesToEndAction => ({
  type: AppActionsEnum.ADD_DATES_TO_END,
  payload: dates,
});

export const setSelectedDate = (date: string): SetSelectedDateAction => ({
  type: AppActionsEnum.SET_SELECTED_DATE,
  payload: date,
});
