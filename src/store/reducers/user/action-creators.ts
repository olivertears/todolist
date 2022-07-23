import { Auth, signOut } from '@firebase/auth';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { SetUserAction, UserActionsEnum, UserState } from './types';
import { addError, setLoader } from '../app/action-creators';
import { IUser } from '../../../models/IUser';
import { AppDispatch } from '../../index';

export const setUser = (user: UserState): SetUserAction => ({
  type: UserActionsEnum.SET_USER,
  payload: user,
});

// THUNK ACTIONS

export const signUp = (auth: Auth, email: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoader(true));
    const res = await createUserWithEmailAndPassword(auth, email, password);
    dispatch(setUser(res.user as IUser));
  } catch (err: any) {
    dispatch(addError('Email is already in use'));
  } finally {
    dispatch(setLoader(false));
  }
};

export const signIn = (auth: Auth, email: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoader(true));
    const res = await signInWithEmailAndPassword(auth, email, password);
    dispatch(setUser(res.user as IUser));
  } catch (err: any) {
    dispatch(addError('Invalid email or password'));
  } finally {
    dispatch(setLoader(false));
  }
};

export const signInWithGoogle = (auth: Auth) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoader(true));
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);
    dispatch(setUser(res.user as IUser));
  } catch (err: any) {
    console.log(err.message);
  } finally {
    dispatch(setLoader(false));
  }
};

export const logout = (auth: Auth) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoader(true));
    await signOut(auth);
    dispatch(setUser({} as IUser));
  } catch (err: any) {
    dispatch(addError('Something went wrong, please try again later'));
  } finally {
    dispatch(setLoader(false));
  }
};
