import React from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
// @ts-ignore
import cl from './Navbar.module.scss';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import { UserState } from '../../store/reducers/user/types';

const Navbar = () => {
  const auth = getAuth();
  const { isAuth } = useTypedSelector((state) => state.user);
  const { setError, setUser, setLoader } = useActions();

  const signOutFromAcc = () => {
    setLoader(true);
    signOut(auth)
      .then((res) => {
        const user: UserState = {
          uid: '',
          email: '',
          isAuth: false,
        };
        setUser(user);
      })
      .catch((err) => {
        setError('Something went wrong, please try again later');
      })
      .finally(() => setLoader(false));
  };

  return (
    <header className={cl.header}>
      <div className={cl.header__content}>
        <h2 className={cl.header__content__logo}>To-Do List</h2>
        <nav className={cl.header__content__nav}>
          {isAuth ? (
            <Link to={'/sign_in'} className={cl.header__content__nav__link} onClick={signOutFromAcc}>
              Sign Out
            </Link>
          ) : (
            <>
              <Link to={'/sign_up'} className={cl.header__content__nav__link}>
                Sign Up
              </Link>
              <Link to={'/sign_in'} className={cl.header__content__nav__link}>
                Sign In
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
