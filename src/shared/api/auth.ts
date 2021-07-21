export interface User {
  name: string;
  login: string;
}

export interface UserLoginRequest {
  login: string;
  password: string;
}

export interface UserLoginResponse {
  user: User;
  status: 'success' | 'error';
}

export interface LogoutUserResponse {
  status: 'success' | 'error';
}

const mockUser: User = {
  login: 'admin',
  name: 'admin',
};

export function loginUser(
  loginUserData: UserLoginRequest,
): Promise<UserLoginResponse> | null {
  if (
    loginUserData.login === mockUser.login &&
    loginUserData.password === '12345'
  ) {
    return Promise.resolve({ user: mockUser, status: 'success' });
  }

  return Promise.reject({ error: 'Error when auth', status: 'error' });
}

export function logoutUser(): Promise<LogoutUserResponse> {
  return Promise.resolve({ status: 'success' });
}
