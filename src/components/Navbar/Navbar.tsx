import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useSelector } from 'react-redux';
import cl from './Navbar.module.scss';
import { logout } from '../../store/reducers/user/action-creators';
import { userSelector } from '../../store/reducers/user/selector';
import { useThunkDispatch } from '../../hooks/useThunkDispatch';

const Navbar = () => {
  const auth = getAuth();
  const dispatch = useThunkDispatch();
  const user = useSelector(userSelector);

  const signOut = () => {
    dispatch(logout(auth));
  };

  return (
    <header className={cl.header}>
      <div className={cl.header__content}>
        <h2 className={cl.header__content__logo}>To-Do List</h2>
        <nav className={cl.header__content__nav}>
          {user.uid ? (
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
