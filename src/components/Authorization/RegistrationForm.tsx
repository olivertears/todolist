import React, { FC, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import cl from './Authorization.module.scss';
import { IUser } from '../../models/IUser';
import { addError, setLoader } from '../../store/reducers/app/action-creators';
import { setUser } from '../../store/reducers/user/action-creators';
import { RouteNames } from '../../router/RouteNames';

const RegistrationForm: FC = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmedPassword, setConfirmedPassword] = useState<string>('');

  const passwordMatch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    password === confirmedPassword ? signUp() : dispatch(addError('Passwords do not match'));
  };

  const signUp = () => {
    dispatch(setLoader(true));
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        dispatch(setUser(res.user as IUser));
        navigate(RouteNames.CALENDAR);
      })
      .catch((error) => {
        dispatch(addError('Email is already in use'));
      })
      .finally(() => dispatch(setLoader(false)));
  };

  const signUpWithGoogle = () => {
    dispatch(setLoader(true));
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((res) => {
        dispatch(setUser(res.user as IUser));
        navigate(RouteNames.CALENDAR);
      })
      .finally(() => dispatch(setLoader(false)));
  };

  return (
    <div className={cl.wrap}>
      <h2 className={cl.wrap__title}>SIGN UP</h2>
      <form className={cl.wrap__form} onSubmit={passwordMatch}>
        <input
          required
          type={'email'}
          placeholder={'Email'}
          className={cl.wrap__form__input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          type={'password'}
          minLength={6}
          placeholder={'Password'}
          className={cl.wrap__form__input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          required
          type={'password'}
          minLength={6}
          placeholder={'Confirm password'}
          className={cl.wrap__form__input}
          value={confirmedPassword}
          onChange={(e) => setConfirmedPassword(e.target.value)}
        />
        <button type={'submit'}>SIGN UP</button>
        <h3 className={cl.wrap__form__google} onClick={signUpWithGoogle}>
          Sign up with Google
        </h3>
      </form>
    </div>
  );
};

export default RegistrationForm;
