import { createEffect, forward, merge } from 'effector';
import { setAuthUser } from '@brunhild/entities/user';
import { paths } from '@brunhild/pages/paths';
import {
  loginUser,
  logoutUser,
  User,
  UserLoginRequest,
} from '@brunhild/shared/api';
import { history } from '@brunhild/shared/config';

export const loginUserFx = createEffect({
  handler: async (loginData: UserLoginRequest) => {
    const loginRes = await loginUser(loginData);
    return loginRes?.user || null;
  },
});

export const logoutUserFx = createEffect({
  handler: async () => {
    await logoutUser();
    return null;
  },
});

export const afterUserLoginFx = createEffect({
  handler: (userData: User | null) => {
    if (userData) {
      localStorage.setItem('authUser', JSON.stringify(userData));
      history.push(paths.home());
    }
  },
});

export const afterUserLogoutFx = createEffect({
  handler: () => {
    localStorage.removeItem('authUser');
  },
});

export const redirectToLoginFx = createEffect({
  handler: () => {
    history.push(paths.login());
  },
});

export const initAuthFx = createEffect({
  handler: () => {
    const authLS = localStorage.getItem('authUser');

    if (!authLS) {
      throw { error: 'not_auth' };
    }

    return JSON.parse(authLS);
  },
});

forward({
  from: merge([
    loginUserFx.doneData,
    initAuthFx.doneData,
    logoutUserFx.doneData,
  ]),
  to: setAuthUser,
});

forward({
  from: merge([initAuthFx.fail, logoutUserFx.done]),
  to: redirectToLoginFx,
});

forward({
  from: merge([loginUserFx.doneData, logoutUserFx.doneData]),
  to: afterUserLoginFx,
});
