import { UserAction, UserActionsEnum, UserState } from './types';

const initialState: UserState = {
  uid: '',
  email: '',
  auth: false,
};

export default function (state = initialState, action: UserAction): UserState {
  switch (action.type) {
    case UserActionsEnum.SET_USER:
      return action.payload;
    default:
      return state;
  }
}
