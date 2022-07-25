import React from 'react';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import cl from './Navbar.module.scss';
import { logout } from '../../store/reducers/user/action-creators';
import { useThunkDispatch } from '../../hooks/useThunkDispatch';

const Navbar = () => {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const dispatch = useThunkDispatch();

  const signOut = () => {
    dispatch(logout(auth));
  };

  return (
    <header className={cl.header}>
      <div className={cl.header__content}>
        <h2 className={cl.header__content__logo}>To-Do List</h2>
        <nav className={cl.header__content__nav}>
          {loading || user ? (
            <Link to={'/sign_in'} className={cl.header__content__nav__link} onClick={signOut}>
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
