import React from 'react';

export interface IRoute {
  path: string;
  element: React.ComponentType;
  guard: boolean;
}

export enum RouteNames {
  NOT_FOUND = 'not_found',
  SIGN_IN = '/sign_in',
  SIGN_UP = '/sign_up',
  MAIN = '/',
  TASK_REDACTION = '/task_redaction',
}
