import React, { FC } from 'react';
import RegistrationForm from '../components/Authorization/RegistrationForm';
import ErrorToast from '../components/ErrorToast/ErrorToast';
import { useTypedSelector } from '../hooks/useTypedSelector';

const SignUp: FC = () => {
  const { error } = useTypedSelector((state) => state.app);

  return (
    <div>
      <RegistrationForm />
      {error && <ErrorToast />}
    </div>
  );
};

export default SignUp;
