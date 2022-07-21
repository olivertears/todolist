import React, { FC, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '../../router/RouteNames';
import cl from './Authorization.module.scss';
import { signIn, signInWithGoogle } from '../../store/reducers/user/action-creators';
import { useThunkDispatch } from '../../hooks/useThunkDispatch';

const LoginForm: FC = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useThunkDispatch();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signIn(auth, email, password));
    navigate(RouteNames.MAIN);
  };

  const signInWithPopup = () => {
    dispatch(signInWithGoogle(auth)).then(() => navigate(RouteNames.MAIN));
  };

  return (
    <div className={cl.wrap}>
      <h2 className={cl.wrap__title}>SIGN IN</h2>
      <form className={cl.wrap__form} onSubmit={login}>
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
        <h3 className={cl.wrap__form__google} onClick={signInWithPopup}>
          Sign in with Google
        </h3>
      </form>
    </div>
  );
};

export default LoginForm;
