import React, { FC, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
// @ts-ignore
import cl from './RegistrationForm.module.scss';
import { useActions } from '../../hooks/useActions';
import { UserState } from '../../store/reducers/user/types';

const RegistrationForm: FC = () => {
  const auth = getAuth();
  const { setUser } = useActions();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmedPassword, setConfirmedPassword] = useState<string>('');

  const passwordMatch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    password === confirmedPassword ? signup() : console.log('Passwords do not match');
  };

  const signup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user: UserState = {
          uid: userCredential.user.uid,
          email: userCredential.user.email || '',
          auth: true,
        };
        setUser(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
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
        <h3 className={cl.wrap__form__google}>Sign up with Google</h3>
      </form>
    </div>
  );
};

export default RegistrationForm;
