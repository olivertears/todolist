import React from 'react';
import { Link } from 'react-router-dom';
// @ts-ignore
import cl from './Navbar.module.scss';

const Navbar = () => {
  return (
    <header className={cl.header}>
      <div className={cl.header__content}>
        <h2 className={cl.header__content__logo}>To-Do List</h2>
        <nav className={cl.header__content__nav}>
          <Link to={'/sign_up'} className={cl.header__content__nav__link}>
            Sign Up
          </Link>
          <Link to={'/sign_in'} className={cl.header__content__nav__link}>
            Sign In
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
