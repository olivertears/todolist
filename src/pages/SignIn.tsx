import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import LoginForm from '../components/Authorization/LoginForm';
import Loader from '../components/Loader/Loader';
import { appSelector } from '../store/reducers/app/selector';

const SignIn: FC = () => {
  const { loader } = useSelector(appSelector);

  return loader ? <Loader /> : <LoginForm />;
};

export default SignIn;
