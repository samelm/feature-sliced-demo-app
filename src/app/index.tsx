import React from 'react';
import { Router } from 'react-router';
import { initAuthFx } from '@brunhild/entity/user/auth';
import { runMockServer } from '@brunhild/mock-server';
import { Pages } from '@brunhild/pages';
import { history } from '@brunhild/shared/config';
import './index.css';

initAuthFx();

if (process.env.NODE_ENV === 'development') {
  runMockServer({ environment: 'development' });
}

export function App() {
  return (
    <Router history={history}>
      <Pages />
    </Router>
  );
}
