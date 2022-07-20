import { AppAction, AppActionsEnum, AppState } from './types';

const initialState: AppState = {
  loader: false,
  errors: [] as string[],
};

export default function (state = initialState, action: AppAction): AppState {
  switch (action.type) {
    case AppActionsEnum.SET_LOADER:
      return { ...state, loader: action.payload };
    case AppActionsEnum.ADD_ERROR:
      return { ...state, errors: [...state.errors, action.payload] };
    case AppActionsEnum.REMOVE_ERROR:
      return { ...state, errors: state.errors.filter((err, id) => id !== 0) };
    default:
      return state;
  }
}
