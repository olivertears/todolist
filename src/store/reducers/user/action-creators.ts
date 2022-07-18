import { SetUserAction, UserActionsEnum, UserState } from './types';

export const UserActionCreators = {
  setUser: (user: UserState): SetUserAction => ({
    type: UserActionsEnum.SET_USER,
    payload: user,
  }),
};
