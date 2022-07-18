import { AppAction, AppActionsEnum, AppState } from './types';

const initialState: AppState = {
  loader: false,
  error: '',
};

export default function (state = initialState, action: AppAction): AppState {
  switch (action.type) {
    case AppActionsEnum.SET_LOADER:
      return { ...state, loader: action.payload };
    case AppActionsEnum.SER_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
