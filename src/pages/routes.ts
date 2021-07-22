import { Error404Page } from './error404';
import { HomePage } from './home';
import { LoginPage } from './login';
import { paths } from './paths';
import { ProjectEditPage } from './project/edit';

export const ROUTES = [
  { path: paths.home(), exact: true, component: HomePage },
  { path: paths.login(), exact: true, component: LoginPage },
  { path: paths.projectEdit(), exact: true, component: ProjectEditPage },
  { path: '*', component: Error404Page },
];
