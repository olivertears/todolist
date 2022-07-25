import { Auth, signInWithRedirect, signOut } from '@firebase/auth';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { addError, setLoader } from '../app/action-creators';
import { AppDispatch } from '../../index';
import { resetTasks } from '../task/action-creators';

// THUNK ACTIONS

export const signUp = (auth: Auth, email: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoader(true));
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (err: any) {
    dispatch(addError('Email is already in use'));
  } finally {
    dispatch(setLoader(false));
  }
};

export const signIn = (auth: Auth, email: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoader(true));
    await signInWithEmailAndPassword(auth, email, password);
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
    window.innerWidth < 768 ? await signInWithRedirect(auth, provider) : await signInWithPopup(auth, provider);
  } finally {
    dispatch(setLoader(false));
  }
};

export const logout = (auth: Auth) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoader(true));
    await signOut(auth);
    dispatch(resetTasks());
  } catch (err: any) {
    dispatch(addError('Something went wrong, please try again later'));
  } finally {
    dispatch(setLoader(false));
  }
};
