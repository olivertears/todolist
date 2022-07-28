import React from 'react';
import { RouteNames, IRoute } from './AppRouter.types';
const SignIn = React.lazy(() => import('../pages/SignIn'));
const SignUp = React.lazy(() => import('../pages/SignUp'));
const TaskRedaction = React.lazy(() => import('../pages/TaskRedaction'));
const Main = React.lazy(() => import('../pages/Main'));

export const routes: IRoute[] = [
  { path: RouteNames.SIGN_IN, element: SignIn, guard: false },
  { path: RouteNames.SIGN_UP, element: SignUp, guard: false },
  { path: RouteNames.MAIN, element: Main, guard: true },
  { path: RouteNames.TASK_REDACTION, element: TaskRedaction, guard: true },
];
