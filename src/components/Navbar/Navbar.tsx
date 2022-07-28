import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import cl from './Navbar.module.scss';
import { logout } from '../../store/reducers/user/action-creators';
import { useThunkDispatch } from '../../hooks/useThunkDispatch';
import { RouteNames } from '../../router/AppRouter.types';

const Navbar = () => {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const dispatch = useThunkDispatch();

  const signOut = () => dispatch(logout(auth)).then(() => navigate(RouteNames.SIGN_IN));

  return (
    <header className={cl.header}>
      <div className={cl.header__content}>
        <h2 className={cl.header__content__logo}>To-Do List</h2>
        <nav className={cl.header__content__nav}>
          {user ? (
            <Link to={'/sign_in'} className={cl.header__content__nav__link} onClick={signOut}>
              {loading || 'Sign Out'}
            </Link>
          ) : (
            <>
              <Link to={'/sign_up'} className={cl.header__content__nav__link}>
                {loading || 'Sign Up'}
              </Link>
              <Link to={'/sign_in'} className={cl.header__content__nav__link}>
                {loading || 'Sign In'}
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
