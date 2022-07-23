import { IUser } from '../../../models/IUser';

export type UserState = IUser;

export enum UserActionsEnum {
  SET_USER = 'SET_USER',
}

export interface SetUserAction {
  type: UserActionsEnum.SET_USER;
  payload: UserState;
}

export type UserAction = SetUserAction;
