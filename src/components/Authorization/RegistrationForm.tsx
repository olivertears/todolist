import React, { FC, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import cl from './Authorization.module.scss';
import { addError, setLoader } from '../../store/reducers/app/action-creators';
import { signInWithGoogle, signUp } from '../../store/reducers/user/action-creators';
import { RouteNames } from '../../router/RouteNames';
import { useThunkDispatch } from '../../hooks/useThunkDispatch';

const RegistrationForm: FC = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useThunkDispatch();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmedPassword, setConfirmedPassword] = useState<string>('');

  const passwordMatch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    password === confirmedPassword ? registration() : dispatch(addError('Passwords do not match'));
  };

  const registration = () => {
    dispatch(signUp(auth, email, password));
    navigate(RouteNames.MAIN);
  };

  const signInWithPopup = () => {
    dispatch(signInWithGoogle(auth));
    navigate(RouteNames.MAIN);
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
        <h3 className={cl.wrap__form__google} onClick={signInWithPopup}>
          Sign up with Google
        </h3>
      </form>
    </div>
  );
};

export default RegistrationForm;
