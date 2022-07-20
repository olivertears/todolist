import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import RegistrationForm from '../components/Authorization/RegistrationForm';
import Loader from '../components/Loader/Loader';
import { appSelector } from '../store/reducers/app/selector';

const SignUp: FC = () => {
  const { loader } = useSelector(appSelector);

  return loader ? <Loader /> : <RegistrationForm />;
};

export default SignUp;
