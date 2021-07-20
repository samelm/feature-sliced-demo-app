import { Error404Page } from './error404';
import { HomePage } from './home';
import { LoginPage } from './login';
import { paths } from './paths';

export const ROUTES = [
  { path: paths.home(), exact: true, component: HomePage },
  { path: paths.login(), exact: true, component: LoginPage },
  { path: '*', component: Error404Page },
];
