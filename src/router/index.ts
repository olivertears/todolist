import React from 'react';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import TaskRedaction from '../pages/TaskRedaction';
import Main from '../pages/Main';
import { RouteNames } from './RouteNames';

export interface IRoute {
  path: string;
  element: React.ComponentType;
}

export const publicRoutes: IRoute[] = [
  { path: RouteNames.SIGN_IN, element: SignIn },
  { path: RouteNames.SIGN_UP, element: SignUp },
];

export const privateRoutes: IRoute[] = [
  { path: RouteNames.MAIN, element: Main },
  { path: RouteNames.TASK_REDACTION, element: TaskRedaction },
];
