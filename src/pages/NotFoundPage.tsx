import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { appSelector } from '../store/reducers/app/selector';
import Loader from '../components/Loader/Loader';
import NotFound from '../components/NotFound/NotFound';

const NotFoundPage: FC = () => {
  const { loader } = useSelector(appSelector);

  return loader ? <Loader /> : <NotFound />;
};

export default NotFoundPage;
