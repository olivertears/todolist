export interface UserState {
  uid: string;
  email: string;
  isAuth: boolean;
}

export enum UserActionsEnum {
  SET_USER = 'SET_USER',
}

export interface SetUserAction {
  type: UserActionsEnum.SET_USER;
  payload: UserState;
}

export type UserAction = SetUserAction;
