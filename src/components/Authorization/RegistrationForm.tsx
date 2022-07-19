import React, { FC, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
// @ts-ignore
import cl from './Authorization.module.scss';
import { useActions } from '../../hooks/useActions';
import { UserState } from '../../store/reducers/user/types';
// eslint-disable-next-line import/no-cycle
import { RouteNames } from '../../router';

const RegistrationForm: FC = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const { setUser, setError, setLoader } = useActions();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmedPassword, setConfirmedPassword] = useState<string>('');

  const passwordMatch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    password === confirmedPassword ? signUp() : console.log('Passwords do not match');
  };

  const signUp = () => {
    setLoader(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const user: UserState = {
          uid: res.user.uid,
          email: res.user.email || '',
          isAuth: true,
        };
        setUser(user);
        navigate(RouteNames.CALENDAR);
      })
      .catch((error) => {
        setError('Email is already in use');
      })
      .finally(() => setLoader(false));
  };

  const signUpWithGoogle = () => {
    setLoader(true);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((res) => {
        const user: UserState = {
          uid: res.user.uid,
          email: res.user.email || '',
          isAuth: true,
        };
        setUser(user);
        navigate(RouteNames.CALENDAR);
      })
      .finally(() => setLoader(false));
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
