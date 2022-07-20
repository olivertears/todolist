import React, { FC, useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RouteNames } from '../../router/RouteNames';
import cl from './Authorization.module.scss';
import { IUser } from '../../models/IUser';
import { setUser, signIn } from '../../store/reducers/user/action-creators';
import { addError, setLoader } from '../../store/reducers/app/action-creators';

const LoginForm: FC = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // const login = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   dispatch(signIn(auth, email, password));
  // };

  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setLoader(true));
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        dispatch(setUser(res.user as IUser));
      })
      .catch((err) => {
        dispatch(addError('Invalid email or password'));
      });
    dispatch(setLoader(false));
  };

  const signInWithGoogle = () => {
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
        <h3 className={cl.wrap__form__google} onClick={signInWithGoogle}>
          Sign in with Google
        </h3>
      </form>
    </div>
  );
};

export default LoginForm;
