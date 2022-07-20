import React from 'react';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import TaskRedaction from '../pages/TaskRedaction';
import Calendar from '../pages/Calendar';
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
  { path: RouteNames.CALENDAR, element: Calendar },
  { path: RouteNames.TASK_REDACTION, element: TaskRedaction },
];
