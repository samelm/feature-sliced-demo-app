import { createStore, forward } from 'effector';
import {
  afterUserLoginFx,
  afterUserLogoutFx,
  initAuthFx,
  loginUserFx,
  logoutUserFx,
  redirectToLoginFx,
} from '@brunhild/features/auth';
import { User } from '@brunhild/shared/api';

export const $authUser = createStore<User | null>(null);

export const $isAuthenticated = $authUser.map((user) => user !== null);

$authUser
  .on(loginUserFx.doneData, (_, user) => user)
  .on(initAuthFx.doneData, (_, user) => user)
  .reset(logoutUserFx);

forward({ from: initAuthFx.fail, to: redirectToLoginFx });

forward({ from: logoutUserFx.done, to: redirectToLoginFx });

forward({
  from: loginUserFx.doneData,
  to: afterUserLoginFx,
});

forward({
  from: logoutUserFx.done,
  to: afterUserLogoutFx,
});
