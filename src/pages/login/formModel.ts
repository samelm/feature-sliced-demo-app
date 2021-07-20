import { combine, createEvent, createStore, sample } from 'effector';
import { loginUserFx } from '@brunhild/entities/user/auth';

export const loginChanged = createEvent<string>();
export const passwordChanged = createEvent<string>();
export const loginFormSubmit = createEvent();

const $login = createStore('').on(loginChanged, (_, login) => login);
const $password = createStore('').on(
  passwordChanged,
  (_, password) => password,
);

export const $loginFormState = combine({ login: $login, password: $password });

sample({
  source: $loginFormState,
  clock: loginFormSubmit,
  target: loginUserFx,
});
