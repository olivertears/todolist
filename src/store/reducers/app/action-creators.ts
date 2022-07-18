import { AppActionsEnum, SetErrorAction, SetLoaderAction } from './types';

export const AppActionCreators = {
  setLoader: (loader: boolean): SetLoaderAction => ({
    type: AppActionsEnum.SET_LOADER,
    payload: loader,
  }),
  setError: (error: string): SetErrorAction => ({
    type: AppActionsEnum.SER_ERROR,
    payload: error,
  }),
};
