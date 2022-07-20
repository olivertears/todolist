import { AddErrorAction, AppActionsEnum, RemoveErrorAction, SetLoaderAction } from './types';

// export const AppActionCreators = {
//   setLoader: (loader: boolean): SetLoaderAction => ({
//     type: AppActionsEnum.SET_LOADER,
//     payload: loader,
//   }),
//   addError: (error: string): AddErrorAction => ({
//     type: AppActionsEnum.ADD_ERROR,
//     payload: error,
//   }),
//   removeError: (): RemoveErrorAction => ({
//     type: AppActionsEnum.REMOVE_ERROR,
//   }),
// };

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
