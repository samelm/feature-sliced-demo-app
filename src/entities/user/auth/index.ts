import { createEffect, createStore, forward } from 'effector';
import { paths } from '@brunhild/pages/paths';
import {
  loginUser,
  logoutUser,
  User,
  UserLoginRequest,
} from '@brunhild/shared/api/auth';
import { history } from '@brunhild/shared/config';

export interface AuthUser {
  name: string;
}

export const loginUserFx = createEffect({
  handler: async (loginData: UserLoginRequest) => {
    const loginRes = await loginUser(loginData);
    return loginRes.user;
  },
});

export const logoutUserFx = createEffect({
  handler: () => logoutUser(),
});

export const afterUserLoginFx = createEffect({
  handler: (userData: User) => {
    localStorage.setItem('authUser', JSON.stringify(userData));
    history.push(paths.home());
  },
});

export const afterUserLogoutFx = createEffect({
  handler: () => {
    localStorage.removeItem('authUser');
  },
});

export const $authUser = createStore<AuthUser | null>(null);

export const $isAuthenticated = $authUser.map((user) => user !== null);

export const initAuthFx = createEffect({
  handler: () => {
    const authLS = localStorage.getItem('authUser');

    if (!authLS) {
      throw { error: 'not_auth' };
    }

    return JSON.parse(authLS);
  },
});

const redirectToLoginFx = createEffect({
  handler: () => {
    history.push(paths.login());
  },
});

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
