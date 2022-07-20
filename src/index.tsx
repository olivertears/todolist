import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import 'firebase/firestore';
import 'firebase/auth';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import './firebaseInit';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
