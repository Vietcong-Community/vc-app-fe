export interface ICreateUser {
  email: string;
  password: string;
  nickname: string;
}

export interface IForgottenPassword {
  email: string;
}

export interface IChangePassword {
  token: string;
  password: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface ILoginSuccess {
  token: string;
}

export interface IUserMe {
  email: string;
  nickname: string;
  firstName?: string;
  lastName?: string;
  createdAt: string;
}

export interface IUpdateUser {
  email: string;
  nickname: string;
  firstName?: string;
  lastName?: string;
}
