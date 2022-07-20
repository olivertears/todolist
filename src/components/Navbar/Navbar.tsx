import React from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import cl from './Navbar.module.scss';
import { addError, setLoader } from '../../store/reducers/app/action-creators';
import { setUser } from '../../store/reducers/user/action-creators';
import { userSelector } from '../../store/reducers/user/selector';

const Navbar = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  const signOutFromAcc = () => {
    dispatch(setLoader(true));
    signOut(auth)
      .then((res) => {
        dispatch(setUser(null));
      })
      .catch((err) => {
        dispatch(addError('Something went wrong, please try again later'));
      })
      .finally(() => dispatch(setLoader(false)));
  };

  return (
    <header className={cl.header}>
      <div className={cl.header__content}>
        <h2 className={cl.header__content__logo}>To-Do List</h2>
        <nav className={cl.header__content__nav}>
          {user ? (
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
