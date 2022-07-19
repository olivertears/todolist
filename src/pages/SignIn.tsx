import React, { FC } from 'react';
import LoginForm from '../components/Authorization/LoginForm';
import { useTypedSelector } from '../hooks/useTypedSelector';
import ErrorToast from '../components/ErrorToast/ErrorToast';

const SignIn: FC = () => {
  const { error } = useTypedSelector((state) => state.app);

  return (
    <div>
      <LoginForm />
      {error && <ErrorToast />}
    </div>
  );
};

export default SignIn;
