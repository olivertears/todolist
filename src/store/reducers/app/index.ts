import { AppAction, AppActionsEnum, AppState } from './types';
import { getDateArray } from '../../../utils/getDates';
import { translateDateToIDate } from '../../../utils/translateDateToIDate';

const initialState: AppState = {
  loader: false,
  errors: [] as string[],
  dateArray: getDateArray(new Date(), new Date().addDays(30)),
  selectedDate: translateDateToIDate(new Date()),
};

export default function (state = initialState, action: AppAction): AppState {
  switch (action.type) {
    case AppActionsEnum.SET_LOADER:
      return { ...state, loader: action.payload };
    case AppActionsEnum.ADD_ERROR:
      return { ...state, errors: [...state.errors, action.payload] };
    case AppActionsEnum.REMOVE_ERROR:
      return { ...state, errors: state.errors.filter((err, id) => id !== 0) };
    case AppActionsEnum.ADD_DATES_TO_START:
      return { ...state, dateArray: [...action.payload, ...state.dateArray] };
    case AppActionsEnum.ADD_DATES_TO_END:
      return { ...state, dateArray: [...state.dateArray, ...action.payload] };
    case AppActionsEnum.SET_SELECTED_DATE:
      return { ...state, selectedDate: action.payload };
    default:
      return state;
  }
}
