import React, { FC, useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';
// @ts-ignore
import cl from './Authorization.module.scss';
import { UserState } from '../../store/reducers/user/types';
// eslint-disable-next-line import/no-cycle
import { RouteNames } from '../../router';

const LoginForm: FC = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const { setUser, setError, setLoader } = useActions();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const signIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const user: UserState = {
          uid: res.user.uid,
          email: res.user.email || '',
          isAuth: true,
        };
        setUser(user);
        navigate(RouteNames.CALENDAR);
      })
      .catch((err) => {
        setError('Invalid email or password');
      })
      .finally(() => setLoader(false));
  };

  const signInWithGoogle = () => {
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
      <h2 className={cl.wrap__title}>SIGN IN</h2>
      <form className={cl.wrap__form} onSubmit={signIn}>
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
          placeholder={'Password'}
          className={cl.wrap__form__input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type={'submit'}>SIGN IN</button>
        <h3 className={cl.wrap__form__google} onClick={signInWithGoogle}>
          Sign in with Google
        </h3>
      </form>
    </div>
  );
};

export default LoginForm;
