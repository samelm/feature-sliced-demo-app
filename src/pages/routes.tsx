import { Error404Page } from './error404';
import { HomePage } from './home';
import { LoginPage } from './login';

export const ROUTES = [
  { path: '/login', exact: true, component: LoginPage },
  { path: '/', exact: true, component: HomePage },
  { path: '*', component: Error404Page },
];
