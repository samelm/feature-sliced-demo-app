import { createStore, createEvent } from 'effector';
import { User } from '@brunhild/shared/api';

export const setAuthUser = createEvent<User | null>();

export const $authUser = createStore<User | null>(null);

export const $isAuthenticated = $authUser.map((user) => user !== null);

$authUser.on(setAuthUser, (_, user) => user);
